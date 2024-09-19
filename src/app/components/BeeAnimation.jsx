"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import "../accueil.css"

import "atropos/css"
import Atropos from "atropos/react"

export default function BeeAnimation() {
  const [isBeeFlying, setIsBeeFlying] = useState(true)

  // Function to handle scroll
  const handleScroll = () => {
    const section = document.getElementById("beehive-section")
    const sectionPosition = section.getBoundingClientRect().top
    const screenPosition = window.innerHeight / 1.3 // Adjust to control trigger point

    if (sectionPosition < screenPosition) {
      setIsBeeFlying(false) // Bee lands on the hive
    } else {
      setIsBeeFlying(true) // Bee is flying
    }
  }

  // Attach the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="beehive-section-container" id="beehive-section">
      <div className="bee-container">
        {/* Image de la ruche */}

        <Image
          src="/ruch-1.png"
          alt="Beehive"
          width={200}
          height={200}
          className="beehive ruch-move"
        />

        {/* Image de l'abeille */}
        <Image
          src="/bee.png"
          alt="Bee"
          width={150}
          height={150}
          className={`bee ${isBeeFlying ? "flying" : "flying"}`}
        />
      </div>
    </div>
  )
}
