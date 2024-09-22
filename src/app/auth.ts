import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Twitter from "next-auth/providers/twitter"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"
import Tiktok from "next-auth/providers/tiktok"
import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const providers: Provider[] = [
  // Credentials({
  //   credentials: { password: { label: "Password", type: "password" } },
  //   authorize(c) {
  //     if (c.password !== "password") return null
  //     return {
  //       id: "test",
  //       name: "Test User",
  //       email: "test@example.com",
  //     }
  //   },
  // }),
  Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
  }),
  Twitter({
    clientId: process.env.X_API_KEY,
    clientSecret: process.env.X_API_SECRET,
    version: "2.0",
    checks: ["pkce", "state"],
  }),
  MicrosoftEntraID({
    clientId: process.env.AUTH_MICROSOFT_ENTRA_ID,
    clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
    tenantId: process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
  }),
  Tiktok({
    clientId: process.env.TIKTOK_CLIENT_ID,
    clientSecret: process.env.TIKTOK_CLIENT_SECRET,
  }),
]

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")

export const { handlers, auth, signIn, signOut } = NextAuth({
  // debug: true,
  providers,
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      console.log("user: ", user)
      console.log("profile: ", profile)
      console.log("account: ", account)

      const existingUser =
        account.provider != "twitter"
          ? await prisma.user.findUnique({
              where: { email: user.email },
            })
          : await prisma.user.findUnique({
              where: { id: account.providerAccountId },
            })

      if (!existingUser) {
        console.log("Créer un nouvel utilisateur.")
        await prisma.user.create({
          data: {
            id: account.providerAccountId,
            name: user.name || "twitter-user@no-mail.com",
            email:
              user.email ||
              `twitter-user@no-mail${Math.round(
                Math.random() * 100000
              )}${new Date(Date.now())}.com`,
            image:
              account.provider == "google"
                ? user.image.replace("=s96-c", "=s400-c")
                : account.provider == "twitter"
                ? user.image.replace("normal", "400x400")
                : user.image,
          },
        })
      }

      return true
    },

    // Étendre la session pour ajouter des données supplémentaires comme l'ID
    async session({ session, token, user }) {
      if (token?.id) {
        session.user.id = token.id // Ajouter l'ID utilisateur à la session
        session.user.provider = token.provider
      }
      return session
    },

    // Ajouter des informations supplémentaires dans le token JWT (utilisé par NextAuth pour stocker les données utilisateur)
    async jwt({ token, account, user }) {
      if (user) {
        token.id = account.providerAccountId // Ajouter l'ID utilisateur au token JWT lors de la première connexion
        token.provider = account.provider
      }
      return token
    },
  },

  pages: {
    signIn: "/signin",
    signOut: "/signout",
    newUser: "/profil",
  },
})
