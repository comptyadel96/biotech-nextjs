import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string // Ajoute l'ID utilisateur à la session
      provider: string // Ajoute le provider à la session
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    provider: string
  }
}
