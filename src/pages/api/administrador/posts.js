import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } else if (req.method === "POST") {
    const data = JSON.parse(req.body);
    const post = await prisma.post.create({
      data,
    });
    res.status(201).json(post);
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
