"use client"
import { getProviders, signIn, getCsrfToken } from "next-auth/react"
import { useEffect, useState } from "react"
import clsx from "clsx"
import { FcGoogle } from "react-icons/fc"
import { FaMicrosoft, FaTiktok, FaXTwitter } from "react-icons/fa6"
import Image from "next/image"

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
    <div className="flex  lg:h-[100vh] bg-gray-100   lg:pt-[9.8rem]  ">
      <div className="lg:w-[40%] h-full bg-[#ecdca9]  rounded-3xl flex justify-center items-center relative">
        <Image
          src={"/layered.svg"}
          width={1000}
          height={100}
          className="absolute top-0"
        />
        <Image
          width={800}
          height={500}
          src="/login.png"
          className="object-cover absolute -right-[10rem]"
        />
      </div>

      <div className="flex flex-col lg:gap-6 lg:w-[60%] items-center bg-white justify-center ">
        {/* Formulaire de connexion par email et mot de passe */}
        <form
          className="flex flex-col bg-white lg:text-2xl rounded-lg gap-4 "
          method="post"
          action="/api/auth/callback/credentials"
        >
          <h1 className="lg:text-5xl font-semibold  lg:pl-1 border-l-4 border-l-yellow-400 ">
            {" "}
            Connectez-vous{" "}
          </h1>

          <input type="hidden" name="csrfToken" value={csrfToken} />
          <div className="flex flex-col lg:max-w-[75%] lg:gap-7">
            <div className="flex flex-col lg:gap-8  ">
              <label htmlFor="email">
                Email
                <input
                  className="border shadow-md rounded-xl lg:p-2"
                  name="email"
                  id="email"
                  placeholder="exemple@mail.com"
                />
              </label>
            </div>
            <div className="flex flex-col lg:gap-8 ">
              <label htmlFor="password">
                Mot de passe
                <input
                  className="border shadow-md rounded-xl lg:p-2"
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Mot de passe"
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

        <p className="font-bold">Ou bien connecter vous avec : </p>

        {/* Formulaires de connexion pour les fournisseurs externes (Google, etc.) */}
        <div className="flex items-center lg:gap-3">
          {providers &&
            Object.values(providers).map((provider) => {
              let iconName = providerIcons.find(
                (element) => element.name == provider.name
              )
              return (
                <div key={provider.name} className="self-center  ">
                  <button
                    onClick={() =>
                      signIn(provider.id, { callbackUrl: "/profil" })
                    }
                    className={clsx(
                      "px-3 py-1 shadow-md border flex items-center bg-white lg:gap-2",
                      {
                        "bg-white": provider.name == "Google",
                      }
                    )}
                  >
                    {iconName && iconName.icon}
                    <span>
                      {provider.name == "Microsoft Entra ID"
                        ? provider.name.replace("Entra ID", "")
                        : provider.name}
                    </span>
                  </button>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
