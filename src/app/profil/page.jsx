import React from "react"
import { auth, signOut } from "../auth"
import Image from "next/image"
export default async function Profil() {
  const session = await auth()
  if (!session.user) return null

  return (
    <div className="flex flex-col gap-6 lg:pt-10 items-center">
      <form
        action={async (formData) => {
          "use server"
          await signOut({redirectTo:"/"})
        }}
      >
        <button type="submit">Sign out</button>
      </form>
      <Image
        width={155}
        height={155}
        src={session.user.image.replace("=s96-c", "=s800-c")}
        alt="User Avatar"
        className="rounded-full"
      />
      <h1> {session.user.name} </h1>
    </div>
  )
}
