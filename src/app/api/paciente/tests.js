import { prisma } from "@/app/lib/prisma";

export default async function handler(req, res) {
  const userId = req.user.id; // Autenticación implementada.

  if (req.method === "GET") {
    const tests = await prisma.test.findMany({
      where: { patientId: userId },
    });
    res.status(200).json(tests);
  } else if (req.method === "POST") {
    const { answers } = JSON.parse(req.body);

    const result = answers.map((a) => (a.answer.toLowerCase().includes("estres") ? "alto" : "bajo"));
    const resultSummary = `Tu nivel de estrés es ${result.join(", ")}`;

    await prisma.test.create({
      data: {
        patientId: userId,
        questions: answers,
        result: resultSummary,
      },
    });

    res.status(201).json({ message: resultSummary });
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
