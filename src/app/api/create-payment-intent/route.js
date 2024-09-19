// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
import { PrismaClient } from "@prisma/client"
// const calculateOrderAmount = (items) => {
//   // Replace this constant with a calculation of the order's amount
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client
//   // Remplacer par le calcul des articles dynamiques
//   return items.reduce((total, item) => total + item.price * item.quantity, 0)
//   // return 1400
// }

export async function POST(req) {
  const body = await req.json() // Parsing the JSON body
  const { items } = body
  const prisma = new PrismaClient()

  if (!items || !Array.isArray(items) || items.length === 0) {
    return new Response(
      JSON.stringify({ error: "Invalid or missing items data" }),
      { status: 400 }
    )
  }

  try {
    // Récupère les produits depuis la base de données pour valider les prix
    const productIds = items.map((item) => item.id)
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    })

    if (products.length === 0) {
      return new Response(
        JSON.stringify({ error: "No matching products found" }),
        { status: 400 }
      )
    }

    // Calcul du total à partir des prix vérifiés en DB
    const total = products.reduce((acc, product) => {
      const item = items.find((i) => i.id === product.id)
      return acc + product.price * item.quantity
    }, 0)

    console.log("total ", total)
    // Crée le PaymentIntent avec le total
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // Montant total validé par le serveur
      currency: "eur",
    })

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
  } catch (error) {
    console.error("Erreur lors de la création du PaymentIntent :", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
