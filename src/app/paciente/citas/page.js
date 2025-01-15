"use client";

import Navbar from "@/app/componentes/Navbar";
import { useState, useEffect } from "react";

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/paciente/citas");
        if (res.ok) {
          const data = await res.json();
          setAppointments(data);
        } else {
          console.error("Error al cargar las citas.");
        }
      } catch (error) {
        console.error("Error al cargar las citas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Cargando citas...
      </div>
    );
  }

  return (
    <>
      <Navbar role="PATIENT" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Mis Citas</h1>
        <ul className="space-y-4">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <li key={appointment.id} className="border p-4 rounded">
                <p>
                  <strong>Profesional:</strong> {appointment.professionalName}
                </p>
                <p>
                  <strong>Fecha:</strong>{" "}
                  {new Date(appointment.date).toLocaleString()}
                </p>
                <p>
                  <strong>Estado:</strong> {appointment.status}
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No tienes citas programadas.</p>
          )}
        </ul>
      </div>
    </>
  );
}
