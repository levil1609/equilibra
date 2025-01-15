import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const userId = req.user?.id; // Supongamos que un middleware de autenticación establece el usuario
  
    if (req.method === "GET") {
      try {
        const appointments = await prisma.appointment.findMany({
          where: { professionalId: userId },
          include: {
            Patient: {
              include: {
                User: true, // Para obtener el nombre del paciente
              },
            },
          },
        });
  
        const response = appointments.map((appointment) => ({
          id: appointment.id,
          patientName: appointment.Patient.User.name,
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