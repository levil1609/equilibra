"use client"
import Navbar from "@/app/componentes/Navbar";
import { useState } from "react";

export default function MentalHealthTests() {
  const [test, setTest] = useState([]);
  const [results, setResults] = useState("");

  const fetchTest = async () => {
    const res = await fetch("/api/paciente/tests");
    const data = await res.json();
    setTest(data);
  };

  const submitAnswers = async (answers) => {
    const res = await fetch("/api/paciente/tests", {
      method: "POST",
      body: JSON.stringify({ answers }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    setResults(result.message);
  };

  return (
    <>
      <Navbar role="PATIENT" />
      <div className="p-6">
        <h1 className="text-xl font-bold">Pruebas de Salud Mental</h1>
        <button onClick={fetchTest} className="bg-blue-500 text-white p-2 rounded mt-2">
          Obtener Test
        </button>
        <ul className="mt-4">
          {test.map((q, index) => (
            <li key={index} className="border p-4 mt-2 rounded">
              <p>{q.question}</p>
              <input
                type="text"
                placeholder="Tu respuesta"
                onChange={(e) => {
                  const newTest = [...test];
                  newTest[index].answer = e.target.value;
                  setTest(newTest);
                }}
                className="border p-2 mt-2 rounded"
              />
            </li>
          ))}
        </ul>
        <button
          onClick={() => submitAnswers(test)}
          className="bg-green-500 text-white p-2 rounded mt-4"
        >
          Enviar Respuestas
        </button>
        {results && <p className="mt-4 text-green-700">{results}</p>}
      </div>
    </>
  );
}
