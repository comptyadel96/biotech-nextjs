"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import {
  Pagination,
  Navigation,
  EffectFade,
  EffectCards,
  EffectCoverflow,
} from "swiper/modules" // Ajout du module EffectFade

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-fade"
import "swiper/css/effect-cards"
import "swiper/css/effect-coverflow" // Styles pour l'effet fade
import Image from "next/image"

export default function Caroussel() {
  return (
    <Swiper
      modules={[
        Pagination,
        Navigation,
        EffectFade,
        EffectCards,
        EffectCoverflow,
      ]} // Ajout d'EffectFade
      pagination={{ clickable: true }}
      //   navigation
      effect="coverflow" // Activer l'effet fade
      spaceBetween={50}
      slidesPerView={1}
      className="h-full w-full "
      centeredSlides
    >
      <SwiperSlide className="select-none">
        <div className="p-3 bg-gradient-to-l from-gray-900  b flex justify-around items-center rounded-xl">
          <Image
            alt="gelphore boost"
            src={"/gelphore-boost.png"}
            height={200}
            width={450}
            className="object-cover"
          />
          <div className="flex flex-col self-start gap-4">
            <h3 className="lg:text-4xl font-bold text-white">Gelphore Boost</h3>
            <h2 className="lg:text-lg text-gray-300">
              La puissance de la ruche dans chaque fiole !
            </h2>
            <p className="text-gray-500">
              {" "}
              <span className="text-yellow-600 lg:pl-2 lg:border-l-4 border-l-yellow-600">
                Gelée Royale
              </span>{" "}
              3850 mg
            </p>
            <p className="text-gray-500">
              {" "}
              <span className="text-yellow-600 lg:pl-2 lg:border-l-4 border-l-yellow-600">
                Pollen d’abeilles
              </span>{" "}
              550 mg
            </p>
            <p className="text-gray-500">
              {" "}
              <span className="text-yellow-600 lg:pl-2 lg:border-l-4 border-l-yellow-600">
                Propolis purifiée
              </span>{" "}
              40 mg
            </p>
            <p className="text-gray-500">
              {" "}
              <span className="text-yellow-600 lg:pl-2 lg:border-l-4 border-l-yellow-600">
                Vitamine E
              </span>{" "}
              10 mg (83% des VNR)
            </p>

            <h3 className="text-white lg:text-3xl  font-bold">13.90 euros </h3>
            <button className="bg-yellow-500 px-3 py-1 rounded-full lg:mt-6">
              Acheter maintenant
            </button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="p-3 bg-gradient-to-br from-white via-blue-100 to-rose-200 flex justify-center items-center">
          <Image
            alt="gelphore kids"
            src={"/gelphore-kids.png"}
            height={350}
            width={350}
            className="object-contain"
          />
          <h3 className="lg:text-4xl text-rose-600 font-bold">Gelphore kids</h3>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="p-3 bg-gray-800 flex justify-center items-center">
          <Image
            alt="gelphore mag"
            src={"/gelphore-mag.png"}
            height={350}
            width={350}
            className="object-contain"
          />
          <h3 className="lg:text-4xl text-white">Gelphore Mag</h3>
        </div>
      </SwiperSlide>
    </Swiper>
  )
}
