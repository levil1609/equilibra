import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const userId = req.user?.id; // Autenticación requerida

  if (req.method === "GET") {
    try {
      const appointments = await prisma.appointment.findMany({
        where: { patientId: userId },
        include: {
          Professional: {
            include: {
              User: true,
            },
          },
        },
      });

      const response = appointments.map((appointment) => ({
        id: appointment.id,
        professionalName: appointment.Professional?.User?.name || "Sin asignar",
        date: appointment.date,
        status: appointment.status,
      }));

      res.status(200).json(response);
    } catch (error) {
      console.error("Error al obtener citas:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  } else {
    res.status(405).json({ message: "Método no permitido." });
  }
}
