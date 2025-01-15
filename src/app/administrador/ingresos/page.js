"use client";

import Navbar from "@/app/componentes/Navbar";
import { useState, useEffect } from "react";

export default function WeeklyConsolidated() {
  const [weeklyData, setWeeklyData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsolidatedData = async () => {
      try {
        const res = await fetch("/api/administrador/ingresos");
        if (res.ok) {
          const data = await res.json();
          setWeeklyData(data.consolidated);
          setTotalRevenue(data.totalRevenue);
        } else {
          console.error("Error al cargar el consolidado.");
        }
      } catch (error) {
        console.error("Error al cargar el consolidado:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsolidatedData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Cargando consolidado semanal...
      </div>
    );
  }

  return (
    <>
      <Navbar role="ADMIN" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Consolidado Semanal de Pagos</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Profesional</th>
              <th className="border border-gray-300 px-4 py-2">Ingresos Totales</th>
              <th className="border border-gray-300 px-4 py-2">Comisión</th>
              <th className="border border-gray-300 px-4 py-2">Ganancia Final</th>
            </tr>
          </thead>
          <tbody>
            {weeklyData.map((item) => (
              <tr key={item.professionalId}>
                <td className="border border-gray-300 px-4 py-2">
                  {item.professionalName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${item.totalIncome.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${item.commission.toFixed(2)}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${item.finalIncome.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <p className="text-xl font-semibold">
            Total Ingresos de la Plataforma: ${totalRevenue.toFixed(2)}
          </p>
        </div>
      </div>
    </>
  );
}
