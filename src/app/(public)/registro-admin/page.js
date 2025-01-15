"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminRegistration() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    secret: "",
  });

  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register-admin", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Administrador registrado con éxito. Redirigiendo al login...");
      router.push("/login");
    } else {
      const error = await res.json();
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow-md w-80 space-y-4"
      >
        <h1 className="text-2xl font-bold">Registro de Administrador</h1>
        <input
          type="text"
          placeholder="Nombre"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className="border w-full p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className="border w-full p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          className="border w-full p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Clave Secreta"
          value={userData.secret}
          onChange={(e) => setUserData({ ...userData, secret: e.target.value })}
          className="border w-full p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white w-full p-2 rounded"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
