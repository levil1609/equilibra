import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    try {
      // Verificar si el usuario autenticado es ADMIN
      if (req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "No autorizado." });
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

      res.status(201).json({ message: "Administrador creado exitosamente.", user: newUser });
    } catch (error) {
      console.error("Error al crear administrador:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  } else {
    res.status(405).json({ message: "Método no permitido." });
  }
}
