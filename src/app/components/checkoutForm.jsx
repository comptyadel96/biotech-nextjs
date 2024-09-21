import React from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"

export default function CheckoutForm({ dpmCheckerLink }) {
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/payment/success",
      },
    })

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message)
    } else {
      setMessage("An unexpected error occurred.")
    }

    setIsLoading(false)
  }

  const paymentElementOptions = {
    layout: "tabs",
  }

  return (
    <>
      <form
        id="payment-form"
        className="bg-black p-10 rounded-xl  min-h-20 "
        onSubmit={handleSubmit}
      >
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          className="bg-white px-3 py-1 lg:mt-6 mt-3 rounded-md"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Payer maintenant"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  )
}
