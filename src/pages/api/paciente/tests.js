import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const userId = req.user?.id; // Autenticación requerida

  if (req.method === "GET") {
    try {
      const tests = await prisma.test.findMany({
        where: { patientId: userId },
        orderBy: { createdAt: "desc" },
      });

      res.status(200).json(tests);
    } catch (error) {
      console.error("Error al obtener tests:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  } else if (req.method === "POST") {
    try {
      const { questions, answers } = req.body;

      const result = answers.some((a) => a.includes("estres"))
        ? "Alto Estrés"
        : "Bajo Estrés";

      const test = await prisma.test.create({
        data: {
          patientId: userId,
          questions,
          result,
        },
      });

      res.status(201).json(test);
    } catch (error) {
      console.error("Error al guardar el test:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  } else {
    res.status(405).json({ message: "Método no permitido." });
  }
}
