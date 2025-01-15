"use client";

import Navbar from "@/app/componentes/Navbar";

export default function PatientDashboard() {
  return (
    <>
      <Navbar role="PATIENT" />
      <div className="p-6">
        <h1 className="text-xl font-bold">Bienvenido al Dashboard del Paciente</h1>
      </div>
    </>
  );
}
