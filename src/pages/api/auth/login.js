import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Verificar si el usuario existe
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ message: "Correo o contraseña incorrectos." });
      }

      // Verificar la contraseña
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Correo o contraseña incorrectos." });
      }

      // Generar token JWT (para autenticación en el cliente si es necesario)
      const token = sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Devolver el rol del usuario para redirección
      res.status(200).json({ token, role: user.role });
    } catch (error) {
      console.error("Error en el login:", error);
      res.status(500).json({ message: "Ocurrió un error en el servidor." });
    }
  } else {
    res.status(405).json({ message: "Método no permitido." });
  }
}
