"use client"

import Navbar from "@/app/componentes/Navbar";
import { useState, useEffect } from "react";

export default function ProfessionalAppointments() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const res = await fetch("/api/profesional/citas");
    const data = await res.json();
    setAppointments(data);
  };

  const rescheduleAppointment = async (id, newDate) => {
    await fetch(`/api/profesional/citas/${id}`, {
      method: "PUT",
      body: JSON.stringify({ date: newDate }),
      headers: { "Content-Type": "application/json" },
    });
    fetchAppointments();
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <>
      <Navbar role="PROFESSIONAL" />
      <div className="p-6">
        <h1 className="text-xl font-bold">Citas Programadas</h1>
        <ul className="mt-4">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="border p-4 mt-2 rounded">
              <p>Paciente: {appointment.patientName}</p>
              <p>Fecha: {new Date(appointment.date).toLocaleString()}</p>
              <button
                onClick={() =>
                  rescheduleAppointment(appointment.id, prompt("Nueva Fecha (YYYY-MM-DD HH:mm):"))
                }
                className="bg-yellow-500 text-white p-2 rounded mt-2"
              >
                Reprogramar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
