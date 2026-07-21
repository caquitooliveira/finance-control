"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";


type Props = {
  receitas: number;
  despesas: number;
};


export default function GraficoFinanceiro({
  receitas,
  despesas,
}: Props) {

  const dados = [
    {
      nome: "Resumo",
      receitas,
      despesas,
    },
  ];


  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">

      <h2 className="text-xl font-bold text-gray-800 mb-2">
        📊 Resumo financeiro
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        Comparação entre receitas e despesas
      </p>


      <ResponsiveContainer width="100%" height={320}>

        <BarChart data={dados}>

          <XAxis 
            dataKey="nome"
            tick={{ fill: "#6b7280" }}
          />


          <YAxis
            tickFormatter={(valor) =>
              `R$ ${valor}`
            }
          />


          <Tooltip
  formatter={(valor) =>
    `R$ ${Number(valor ?? 0).toFixed(2)}`
  }
/>


          <Legend />


          <Bar
            dataKey="receitas"
            name="Receitas"
            fill="#22c55e"
            radius={[10, 10, 0, 0]}
          />


          <Bar
            dataKey="despesas"
            name="Despesas"
            fill="#ef4444"
            radius={[10, 10, 0, 0]}
          />


        </BarChart>

      </ResponsiveContainer>


    </div>
  );
}