import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Calcular la fecha de inicio de la semana actual
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      // Obtener citas realizadas en la semana
      const appointments = await prisma.appointment.findMany({
        where: {
          status: "realizada",
          date: {
            gte: startOfWeek,
          },
        },
        include: {
          Professional: {
            include: {
              User: true,
            },
          },
          Payment: true,
        },
      });

      // Consolidar datos por profesional
      const consolidated = appointments.reduce((acc, appointment) => {
        const professionalId = appointment.Professional.id;
        const professionalName = appointment.Professional.User.name;
        const payment = appointment.Payment;

        if (!acc[professionalId]) {
          acc[professionalId] = {
            professionalId,
            professionalName,
            totalIncome: 0,
            commission: 0,
          };
        }

        const commissionRate = 0.2; // Comisión del 20%
        const income = payment ? payment.amount : 0;
        const commission = income * commissionRate;

        acc[professionalId].totalIncome += income;
        acc[professionalId].commission += commission;

        return acc;
      }, {});

      // Calcular ingresos finales
      const consolidatedArray = Object.values(consolidated).map((item) => ({
        ...item,
        finalIncome: item.totalIncome - item.commission,
      }));

      // Calcular ingresos totales para la plataforma
      const totalRevenue = consolidatedArray.reduce(
        (acc, item) => acc + item.commission,
        0
      );

      res.status(200).json({ consolidated: consolidatedArray, totalRevenue });
    } catch (error) {
      console.error("Error al calcular el consolidado semanal:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  } else {
    res.status(405).json({ message: "Método no permitido." });
  }
}
