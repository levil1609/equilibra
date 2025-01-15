import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const userId = req.user.id; // Asumimos que está autenticado y que el middleware añade user al req.

  if (req.method === "GET") {
    const profile = await prisma.professional.findUnique({
      where: { userId },
    });
    res.status(200).json(profile);
  } else if (req.method === "PUT") {
    const data = JSON.parse(req.body);
    const profile = await prisma.professional.update({
      where: { userId },
      data,
    });
    res.status(200).json(profile);
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
