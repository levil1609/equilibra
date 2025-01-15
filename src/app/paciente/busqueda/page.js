"use client"
import Navbar from "@/app/componentes/Navbar";
import { useState } from "react";

export default function SearchProfessionals() {
  const [professionals, setProfessionals] = useState([]);
  const [filters, setFilters] = useState({ specialty: "", availability: "" });

  const search = async () => {
    const res = await fetch(`/api/paciente/busqueda?specialty=${filters.specialty}&availability=${filters.availability}`);
    const data = await res.json();
    setProfessionals(data);
  };

  return (
    <>
      <Navbar role="PATIENT" />
      <div className="p-6">
        <h1 className="text-xl font-bold">Buscar Profesionales</h1>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Especialidad"
            value={filters.specialty}
            onChange={(e) => setFilters({ ...filters, specialty: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Disponibilidad"
            value={filters.availability}
            onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
            className="border p-2 rounded ml-2"
          />
          <button onClick={search} className="bg-blue-500 text-white p-2 rounded ml-2">Buscar</button>
        </div>
        <ul className="mt-4">
          {professionals.map((prof) => (
            <li key={prof.id} className="border p-4 mt-2 rounded">
              <h2 className="font-bold">{prof.name}</h2>
              <p>{prof.specialty}</p>
              <p>{prof.availability}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
