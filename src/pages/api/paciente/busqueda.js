import { prisma } from "@/app/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { specialty, availability } = req.query;

    const professionals = await prisma.professional.findMany({
      where: {
        specialty: { contains: specialty },
        availability: { contains: availability },
      },
      include: {
        User: true,
      },
    });

    res.status(200).json(professionals);
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
