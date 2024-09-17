const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
  // Créer des données exemple
  await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
