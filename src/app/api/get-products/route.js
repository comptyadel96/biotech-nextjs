import { PrismaClient } from "@prisma/client" // Assure-toi d'avoir une configuration Prisma correcte

export  async function GET(req, res) {
  const prisma = new PrismaClient()
  try {
      const products = await prisma.product.findMany() // Récupère tous les produits
    //  console.log(products)
    return new Response(
      JSON.stringify({
        products,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des produits" })
  }
}
