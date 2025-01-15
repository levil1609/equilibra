"use client"

import Navbar from "@/app/componentes/Navbar";
import { useState, useEffect } from "react";

export default function ProfessionalProfile() {
  const [profile, setProfile] = useState({
    biography: "",
    specialty: "",
    rate: 0,
  });

  const fetchProfile = async () => {
    const res = await fetch("/api/profesional/perfil");
    const data = await res.json();
    setProfile(data);
  };

  const updateProfile = async () => {
    await fetch("/api/profesional/perfil", {
      method: "PUT",
      body: JSON.stringify(profile),
      headers: { "Content-Type": "application/json" },
    });
    alert("Perfil actualizado");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <Navbar role="PROFESSIONAL" />
      <div className="p-6">
        <h1 className="text-xl font-bold">Perfil Profesional</h1>
        <div className="mt-4">
          <textarea
            value={profile.biography}
            onChange={(e) => setProfile({ ...profile, biography: e.target.value })}
            className="border p-2 w-full rounded"
            placeholder="Biografía"
          />
          <input
            type="text"
            value={profile.specialty}
            onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
            className="border p-2 w-full mt-2 rounded"
            placeholder="Especialidad"
          />
          <input
            type="number"
            value={profile.rate}
            onChange={(e) => setProfile({ ...profile, rate: e.target.value })}
            className="border p-2 w-full mt-2 rounded"
            placeholder="Tarifa"
          />
          <button onClick={updateProfile} className="bg-blue-500 text-white p-2 rounded mt-2">
            Actualizar
          </button>
        </div>
      </div>
    </>
  );
}
