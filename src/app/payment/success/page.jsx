import React from "react"
import { MdCheckCircle } from "react-icons/md"

function success() {
  return (
    <div className="flex flex-col lg:gap-6 items-center lg:py-6 lg:pt-[12rem] ">
      <MdCheckCircle className="lg:text-9xl text-green-500" />
      <h1 className="lg:text-4xl font-bold">
        Félécitations , paiment effectuer avec succées !
      </h1>
      <p>On vous remercie pour votre confiance et votre fidélitée 🧡  </p>
      <button className="bg-yellow-400 font-bold px-3 py-2 rounded-full">
        Consultez votre commande
      </button>
    </div>
  )
}

export default success
