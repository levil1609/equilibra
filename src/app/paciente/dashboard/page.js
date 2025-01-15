"use client";

import Navbar from "@/app/componentes/Navbar";
import { useState, useEffect } from "react";

export default function PatientDashboard() {
  const [nextAppointment, setNextAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNextAppointment = async () => {
      try {
        const res = await fetch("/api/paciente/proxima-cita");
        if (res.ok) {
          const data = await res.json();
          setNextAppointment(data);
        } else {
          console.error("Error al cargar la próxima cita.");
        }
      } catch (error) {
        console.error("Error al cargar la próxima cita:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNextAppointment();
  }, []);

  return (
    <>
      <Navbar role="PATIENT" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard del Paciente</h1>
        <section className="mb-6">
          <h2 className="text-xl font-semibold">Próxima Cita</h2>
          {loading ? (
            <p>Cargando...</p>
          ) : nextAppointment ? (
            <div className="border p-4 rounded mt-4">
              <p>
                <strong>Profesional:</strong> {nextAppointment.professionalName}
              </p>
              <p>
                <strong>Fecha:</strong>{" "}
                {new Date(nextAppointment.date).toLocaleString()}
              </p>
            </div>
          ) : (
            <p className="text-gray-600 mt-4">No tiene citas programadas.</p>
          )}
        </section>
      </div>
    </>
  );
}
