"use client"
import React, { useRef } from "react"
import "../accueil.css"
import useInView from "../lib/useInView"

function BgGradient() {
  const textRef = useRef(null)
  const isInView = useInView(textRef) // Use the custom hook

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="relative">
        <div
          ref={textRef}
          className={`text-container ${isInView ? "in-view" : ""}`}
        >
          <h1 className="animated-text">Boullif Adel</h1>
          <div className="underline" />
        </div>
      </div>
    </div>
  )
}

export default BgGradient
