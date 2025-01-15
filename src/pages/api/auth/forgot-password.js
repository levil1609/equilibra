import { prisma } from "@/app/lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(200).json({ message: "Si el correo está registrado, recibirás un enlace." });
    }

    // Generar un token de recuperación (por simplicidad, es un placeholder aquí).
    const resetToken = "12345";

    // Enviar correo con el token (a implementar con una librería como nodemailer).
    console.log(`Enviar correo a ${email} con el token ${resetToken}`);

    res.status(200).json({ message: "Correo enviado." });
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
