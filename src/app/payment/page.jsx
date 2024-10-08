"use client"
import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
// import CheckoutForm from "../components/CheckoutForm"
import CheckoutForm from "../components/CheckoutForm.jsx"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

export default function App() {
  const [clientSecret, setClientSecret] = React.useState("")
  const [dpmCheckerLink, setDpmCheckerLink] = React.useState("")
  const [confirmed, setConfirmed] = React.useState(false)
  const [items, setItems] = React.useState([]) // Nouvel état pour les items

  React.useEffect(() => {
    setConfirmed(
      new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      )
    )
  }, [])

  React.useEffect(() => {
    // Fetch products from the API
    fetch("/api/get-products")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.products) // Met à jour les items
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des produits : ", error)
      })
  }, [])

  // Une fois que les items sont définis, crée le PaymentIntent
  React.useEffect(() => {
    if (items.length > 0) {
      // Crée un PaymentIntent après la mise à jour des items
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }), // Envoie les items
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret)
          setDpmCheckerLink(data.dpmCheckerLink)
        })
        .catch((error) => {
          console.error("Erreur lors de la création du PaymentIntent : ", error)
        })
    }
  }, [items])
  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#0cd4bd",
      colorBackground: "#3d3d3d",
      colorText: "#ffffff",
    },
  }

  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div className=" flex flex-col   lg:py-[10rem] z-50 max-w-[75%] mx-auto  mt-[10rem] ">
      {/* {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {confirmed ? (
            <CompletePage />
          ) : (
            <CheckoutForm dpmCheckerLink={dpmCheckerLink} />
          )}
        </Elements>
      )} */}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {!confirmed && <CheckoutForm dpmCheckerLink={dpmCheckerLink} />}
        </Elements>
      )}
    </div>
  )
}
