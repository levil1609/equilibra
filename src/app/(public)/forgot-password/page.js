"use client";

import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      alert("Si el correo está registrado, recibirás un enlace de recuperación.");
    } else {
      alert("Error al procesar la solicitud.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleReset}
        className="bg-white p-8 rounded shadow-md w-80 space-y-4"
      >
        <h1 className="text-2xl font-bold">Recuperar Contraseña</h1>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Recuperar Contraseña
        </button>
      </form>
    </div>
  );
}
