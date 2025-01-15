import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const userId = req.user?.id; // Supongamos que un middleware de autenticación establece el usuario

  if (req.method === "GET") {
    try {
      const payments = await prisma.payment.findMany({
        where: {
          Appointment: {
            professionalId: userId,
          },
        },
        include: {
          Appointment: true,
        },
      });

      const response = payments.map((payment) => ({
        id: payment.id,
        amount: payment.amount,
        date: payment.createdAt,
        status: payment.status,
      }));

      res.status(200).json(response);
    } catch (error) {
      console.error("Error al obtener pagos:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  } else {
    res.status(405).json({ message: "Método no permitido." });
  }
}
