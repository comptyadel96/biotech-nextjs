import Image from "next/image"
import SignIn from "./components/signin"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <Image src={"/rename.jpg"} alt="roma emperor" width={400} height={200} />
      <SignIn />
    </main>
  )
}
