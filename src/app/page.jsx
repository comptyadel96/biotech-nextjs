"use client"
import Image from "next/image"
import BgGradient from "./components/bgGradient"
import Caroussel from "./components/caroussel"
import BeeAnimations from "./components/BeeAnimation"
import { RiCustomerServiceFill, RiSecurePaymentFill } from "react-icons/ri"
import { TbTruckDelivery } from "react-icons/tb"
import { useRef } from "react"
import useIsInView from "./lib/useInView"
import "./accueil.css"
import Atropos from "atropos/react"
import "atropos/css"

export default function Home() {
  const textRef = useRef(null)
  const isInView = useIsInView(textRef)
  return (
    <main className="flex min-h-screen flex-col items-center  lg:py-[10rem] overflow-x-hidden">
      <div className="w-full bg-black lg:p-10  bg-ruch flex lg:gap:5">
        <div className="text-white font-semibold  flex flex-col items-center lg:gap-5 self-start lg:max-w-[40%] mr-10  ">
          <h2 className="lg:text-3xl text-green-400 font-bold">
            Découvrez notre gamme de produits Gelphore
          </h2>
          {/* <div
            ref={textRef}
            className={`text-container ${isInView ? "in-view" : ""}`}
          >
            <h1 className="animated-text lg:text-3xl text-green-400 font-bold">
              {" "}
              Découvrez notre gamme de produits Gelphore
            </h1>
            <div className="underline" />
          </div> */}
          <p className="text-lg">
            Profitez des remises exeptionnelles avec vos points de fidélité
          </p>
          <p className="self-start lg:ml-1">
            Découvrez aussi nos packs famille et les packs &ldquo; Forme &ldquo;{" "}
          </p>
          <div className="flex  gap-5  lg:mt-16">
            <div className="flex flex-col items-center">
              <RiCustomerServiceFill size={44} />
              <h4 className="text-center text-lg">
                Services aprés
                <br /> vente
              </h4>
              <p className="text-sm text-center text-gray-300">
                Besoin d&apos;aide ? Contactez-nous
              </p>
            </div>
            <div className="flex flex-col items-center">
              <RiSecurePaymentFill size={44} />
              <h4 className="text-center text-lg">
                Paiment <br /> sécurisé
              </h4>
              <p className="text-sm text-center text-gray-300">
                Cryptage SSL pour des paiements en toute sécurité
              </p>
            </div>
            <div className="flex flex-col items-center">
              <TbTruckDelivery size={44} />
              <h4 className="text-center text-lg">
                Livraison
                <br /> internationale
              </h4>
              <p className="text-sm text-center text-gray-300">
                Nous livrons partout en Monde Entier !
              </p>
            </div>
          </div>
        </div>
        <Caroussel />
      </div>

      {/* produit de qualité  */}
      <section className="self-start  flex items-center justify-evenly bg-white lg:p-10 w-full relative">
        {/* wave decoration */}
        <div className="custom-shape-divider-top-1726766877">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>

        <BeeAnimations />

        <div className="flex flex-col lg:gap-5 lg:max-w-[50%] lg:pt-28 ">
          <h2 className=" lg:text-6xl font-bold">
            Des ingrédients de qualité !
          </h2>
          <p className="text-xl">
            Nos formules sont innovantes et respectent les limites imposées par
            la réglementation des compléments alimentaires en terme de VNR
            (valeur nutritionnelle de référence).
          </p>
          <button className="mt-auto px-3 py-2 rounded-full bg-black text-white self-center">
            Découvrez tous nos produits
          </button>
        </div>
      </section>

      {/* produits et packs et recomandations */}
      <section className="flex flex-col lg:gap-6 lg:p-16 lg:my-20 bg-gray-100 w-full ">
        <h2 className="lg:text-6xl font-bold">Nos best sellers</h2>
        {/* best sellers products */}

        <div className="flex items-center lg:p-10 lg:gap-6 gap-3 bg-white shadow-md border rounded-xl">
          <Atropos
            activeOffset={40}
            // shadowScale={1.05}
            shadow={false}
            color="green"
            onEnter={() => console.log("Enter")}
            onLeave={() => console.log("Leave")}
            onRotate={(x, y) => console.log("Rotate", x, y)}
            className="flex flex-col items-center p-5 gap-6 shadow bg-gray-100"
          >
            <Image
              src="/gelphore-boost.png"
              width={250}
              height={250}
              alt="gelphore boost"
              data-atropos-offset="-5"
            />
            <h3 className="lg:text-xl font-semibold my-3">Gelphore Boost</h3>
            <button
              data-atropos-offset="0"
              className="px-3 py-2 text-white bg-black my-3"
            >
              Voir le produit
            </button>
          </Atropos>

          <div className="flex flex-col p-5 gap-3"></div>
          <div className="flex flex-col p-5 gap-3"></div>
        </div>
      </section>
    </main>
  )
}
