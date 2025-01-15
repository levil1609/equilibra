import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password, secret } = req.body;

    try {
      // Validar clave secreta
      if (secret !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ message: "Clave secreta inválida." });
      }

      // Verificar si el correo ya está registrado
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "El correo ya está registrado." });
      }

      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el usuario con rol ADMIN
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "ADMIN",
        },
      });

      res.status(201).json({ message: "Administrador registrado exitosamente.", user: newUser });
    } catch (error) {
      console.error("Error al registrar administrador:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  } else {
    res.status(405).json({ message: "Método no permitido." });
  }
}
