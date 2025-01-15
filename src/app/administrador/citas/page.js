"use client";

import Navbar from "@/app/componentes/Navbar";
import { useState, useEffect } from "react";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener citas desde la API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/administrador/citas");
        if (res.ok) {
          const data = await res.json();
          setAppointments(data);
        } else {
          console.error("Error al cargar citas.");
        }
      } catch (error) {
        console.error("Error al cargar citas:", error);
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
      <Navbar role="ADMIN" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Gestión de Citas</h1>
        <ul className="space-y-4">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <li key={appointment.id} className="border p-4 rounded">
                <p>
                  <strong>Paciente:</strong> {appointment.patientName}
                </p>
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
                <p>
                  <strong>Pago:</strong> ${appointment.payment?.amount || 0.0} (
                  {appointment.payment?.status || "Sin pago"})
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No hay citas disponibles.</p>
          )}
        </ul>
      </div>
    </>
  );
}
