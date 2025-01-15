import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const users = await prisma.user.findMany({
      include: { Patient: true, Professional: true },
    });
    res.status(200).json(users);
  } else if (req.method === "DELETE") {
    const { id } = req.query;

    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).end();
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
