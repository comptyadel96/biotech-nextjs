import { Inter } from "next/font/google"
import "./globals.css"

import dynamic from "next/dynamic"


const Navbar = dynamic(() => import("./ui/navbar"))

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Biotech",
  description:
    "Des ingrédients de qualité !, Notre gelée royale est d'origine 100 % naturelle",
  icons: {
    icon: "/rename.jpg",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar />

        {children}
      </body>
    </html>
  )
}
