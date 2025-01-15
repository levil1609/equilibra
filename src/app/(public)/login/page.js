"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      const { role } = data;

      // Redirigir al dashboard correspondiente según el rol
      switch (role) {
        case "PATIENT":
          router.push("/paciente/dashboard");
          break;
        case "PROFESSIONAL":
          router.push("/profesional/dashboard");
          break;
        case "ADMIN":
          router.push("/administrador/dashboard");
          break;
        default:
          router.push("/");
          break;
      }
    } else {
      alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-80 space-y-4"
      >
        <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          className="border w-full p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          className="border w-full p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Entrar
        </button>
        <a href="/forgot-password" className="text-blue-500 underline">
          ¿Olvidaste tu contraseña?
        </a>
      </form>
    </div>
  );
}
