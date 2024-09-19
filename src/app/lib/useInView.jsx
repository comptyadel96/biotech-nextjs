"use client"
import { useState, useEffect } from "react"

const useIsInView = (ref) => {
  const [isInView, setIsInView] = useState(false)

  const isElementInViewport = (el) => {
    if (!el) return false
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 150 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current && isElementInViewport(ref.current)) {
        setIsInView(true)
      } else {
        setIsInView(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check the visibility when the component mounts

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [ref])

  return isInView
}

export default useIsInView
