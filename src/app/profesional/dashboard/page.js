"use client";

import Navbar from "@/app/componentes/Navbar";
import { useState, useEffect } from "react";

export default function ProfessionalDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener citas y pagos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsRes, paymentsRes] = await Promise.all([
          fetch("/api/profesional/citas"),
          fetch("/api/profesional/pagos"),
        ]);
        const appointmentsData = await appointmentsRes.json();
        const paymentsData = await paymentsRes.json();

        setAppointments(appointmentsData);
        setPayments(paymentsData);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Cargando datos del profesional...
      </div>
    );
  }

  return (
    <>
      <Navbar role="PROFESSIONAL" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard Profesional</h1>
        <section className="mb-6">
          <h2 className="text-xl font-semibold">Citas Programadas</h2>
          <ul className="mt-4">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <li key={appointment.id} className="border p-4 rounded mb-2">
                  <p>
                    <strong>Paciente:</strong> {appointment.patientName}
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
        </section>
        <section>
          <h2 className="text-xl font-semibold">Pagos Recibidos</h2>
          <ul className="mt-4">
            {payments.length > 0 ? (
              payments.map((payment) => (
                <li key={payment.id} className="border p-4 rounded mb-2">
                  <p>
                    <strong>Importe:</strong> ${payment.amount.toFixed(2)}
                  </p>
                  <p>
                    <strong>Fecha:</strong>{" "}
                    {new Date(payment.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Estado:</strong> {payment.status}
                  </p>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No tienes pagos registrados.</p>
            )}
          </ul>
        </section>
      </div>
    </>
  );
}
