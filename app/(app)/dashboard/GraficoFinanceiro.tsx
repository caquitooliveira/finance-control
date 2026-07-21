"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
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
      nome: "Financeiro",
      receitas,
      despesas,
    },
  ];

  function formatarValor(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}


 return (
  <div className="bg-white rounded-2xl p-5 shadow-sm mt-6">

    <h2 className="text-xl font-bold text-gray-700 mb-5">
      Receitas x Despesas
    </h2>

    <div className="w-full h-[300px]">

      <ResponsiveContainer width="100%" height="100%">

        <BarChart data={dados}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="nome" />

          <YAxis
            tickFormatter={(valor) =>
              `R$ ${(valor / 1000).toFixed(0)}k`
            }
          />

          <Tooltip
            formatter={(valor) =>
              formatarValor(Number(valor))
            }
          />

          <Bar
            dataKey="receitas"
            name="Receitas"
            fill="#22c55e"
          />

          <Bar
            dataKey="despesas"
            name="Despesas"
            fill="#ef4444"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  </div>
);
} 