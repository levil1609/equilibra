import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const appointments = await prisma.appointment.findMany({
        include: {
          Patient: {
            include: {
              User: true,
            },
          },
          Professional: {
            include: {
              User: true,
            },
          },
          Payment: true,
        },
      });

      const response = appointments.map((appointment) => ({
        id: appointment.id,
        patientName: appointment.Patient?.User?.name || "Sin asignar",
        professionalName: appointment.Professional?.User?.name || "Sin asignar",
        date: appointment.date,
        status: appointment.status,
        payment: appointment.Payment
          ? {
              amount: appointment.Payment.amount,
              status: appointment.Payment.status,
            }
          : null,
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
