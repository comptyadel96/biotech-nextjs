"use client"
import { getProviders, signIn, getCsrfToken } from "next-auth/react"
import { useEffect, useState } from "react"
import clsx from "clsx"
import { FcGoogle } from "react-icons/fc"
import { FaMicrosoft, FaTiktok, FaXTwitter } from "react-icons/fa6"

export default function Page() {
  const [providers, setProviders] = useState({})
  const [csrfToken, setCsrfToken] = useState("")
  const providerIcons = [
    { name: "Google", icon: <FcGoogle /> },
    { name: "Twitter", icon: <FaXTwitter /> },
    { name: "Microsoft Entra ID", icon: <FaMicrosoft /> },
    { name: "TikTok", icon: <FaTiktok /> },
    { name: "Credentials", icon: <FaTiktok /> },
  ]

  useEffect(() => {
    // Récupérer les fournisseurs d'authentification et le token CSRF
    async function loadProviders() {
      const authProviders = await getProviders()
      setProviders(authProviders)
      console.log(authProviders)

      const csrf = await getCsrfToken()
      setCsrfToken(csrf)
    }
    loadProviders()
  }, [])

  return (
    <div className="flex flex-col lg:gap-4">
      {/* Formulaire de connexion par email et mot de passe */}
      <form
        className="flex flex-col bg-amber-50 p-16 rounded-lg gap-4 self-center"
        method="post"
        action="/api/auth/callback/credentials"
      >
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <div className="flex flex-col lg:max-w-[75%]">
          <div className="flex flex-col">
            <label htmlFor="email">
              Email
              <input className="border shadow-md" name="email" id="email" />
            </label>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">
              Password
              <input
                className="border shadow-md"
                name="password"
                id="password"
                type="password"
              />
            </label>
          </div>
        </div>
        <input
          type="submit"
          value="Se connecter"
          className="bg-red-500 cursor-pointer px-3 py-1 rounded-lg font-semibold text-white"
        />
      </form>

      {/* Formulaires de connexion pour les fournisseurs externes (Google, etc.) */}
      {providers &&
        Object.values(providers).map((provider) => {
          let iconName = providerIcons.find(
            (element) => element.name == provider.name
          )
          return (
            <div key={provider.name} className="self-center ">
              <button
                onClick={() => signIn(provider.id, { callbackUrl: "/profil" })}
                className={clsx(
                  "px-3 py-1 shadow-md flex items-center lg:gap-2",
                  {
                    "bg-green-300": provider.name == "Google",
                  }
                )}
              >
                {iconName && iconName.icon}
                <span>
                  Connectez-vous avec{" "}
                  {provider.name == "Microsoft Entra ID"
                    ? provider.name.replace("Entra ID", "")
                    : provider.name}
                </span>
              </button>
            </div>
          )
        })}
    </div>
  )
}
