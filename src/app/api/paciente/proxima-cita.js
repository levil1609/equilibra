import { prisma } from "@/app/lib/prisma";

export default async function handler(req, res) {
  const userId = req.user?.id; // Supongamos que un middleware de autenticación establece el usuario

  if (req.method === "GET") {
    try {
      // Obtener la próxima cita ordenada por fecha
      const nextAppointment = await prisma.appointment.findFirst({
        where: {
          patientId: userId,
          date: {
            gte: new Date(), // Solo citas futuras
          },
        },
        orderBy: {
          date: "asc", // Ordenar por la fecha más próxima
        },
        include: {
          Professional: {
            include: {
              User: true, // Para obtener el nombre del profesional
            },
          },
        },
      });

      if (!nextAppointment) {
        return res.status(200).json(null);
      }

      res.status(200).json({
        id: nextAppointment.id,
        date: nextAppointment.date,
        professionalName: nextAppointment.Professional.User.name,
      });
    } catch (error) {
      console.error("Error al obtener la próxima cita:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  } else {
    res.status(405).json({ message: "Método no permitido." });
  }
}
