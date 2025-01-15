import { prisma } from "../../../app/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { specialty = "", availability = "" } = req.query;

    try {
      const professionals = await prisma.professional.findMany({
        where: {
          AND: [
            specialty
              ? { specialty: { contains: specialty, mode: "insensitive" } }
              : {}, // Si no hay especialidad, no se filtra por este campo
            availability
              ? { availability: { contains: availability, mode: "insensitive" } }
              : {}, // Si no hay disponibilidad, no se filtra por este campo
          ],
        },
        include: {
          User: true,
        },
      });

      const response = professionals.map((prof) => ({
        id: prof.id,
        name: prof.User.name,
        specialty: prof.specialty,
        availability: prof.availability,
      }));

      res.status(200).json(response);
    } catch (error) {
      console.error("Error al buscar profesionales:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  } else {
    res.status(405).json({ message: "Método no permitido." });
  }
}
