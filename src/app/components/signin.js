import { signIn } from "../auth"

export default function SignIn() {
  return (
    <div className="lg:mt-[13rem] flex items-center flex-col lg:gap-4  gap-2 lg:p-10 bg-emerald-100 lg:w-[40%] mx-auto ">
      <h1 className="lg:text-4xl 3xl font-bold">Vous n&apos;etes pas connecter </h1>
      <p className="lg:text-2xl text-xl">Connectez vous pour acceder à ce contenu</p>

      <form
        action={async () => {
          "use server"
          await signIn()
        }}
      >
        <button type="submit" className="lg:text-xl text-lg px-3 py-1 bg-black text-green-300 rounded-full">Se connecter</button>
      </form>
    </div>
  )
}
