import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
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
      console.log("Profil Google:", profile)

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      })

      if (!existingUser) {
        console.log("Créer un nouvel utilisateur.")
        await prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
            image: user.image.replace("=s96-c", "=s400-c"),
          },
        })
      }

      return true
    },
  },

  pages: {
    signIn: "/signin",
    signOut: "/signout",
  },
})
