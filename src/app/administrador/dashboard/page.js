"use client"

import Navbar from "@/app/componentes/Navbar";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("/api/administrador/usuarios");
    const data = await res.json();
    setUsers(data);
  };

  const deleteUser = async (id) => {
    await fetch(`/api/administrador/usuarios/${id}`, {
      method: "DELETE",
    });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Navbar role="ADMIN" />
      <div className="p-6">
        <h1 className="text-xl font-bold">Gestión de Usuarios</h1>
        <ul className="mt-4">
          {users.map((user) => (
            <li key={user.id} className="border p-4 mt-2 rounded">
              <p>Nombre: {user.name}</p>
              <p>Email: {user.email}</p>
              <button
                onClick={() => deleteUser(user.id)}
                className="bg-red-500 text-white p-2 rounded mt-2"
              >
                Eliminar Usuario
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
