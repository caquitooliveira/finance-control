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
  dados: {
    mes: string;
    receitas: number;
    despesas: number;
  }[];
};


export default function GraficoMensal({
  dados,
}: Props) {

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm mt-6">

      <h2 className="text-xl font-bold text-gray-700 mb-5">
        Evolução mensal
      </h2>


      <ResponsiveContainer width="100%" height={250}>

        <BarChart data={dados}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="mes"
          tick={{ fontSize: 12 }} />

          <YAxis />

          <Tooltip />


          <Bar
            dataKey="receitas"
            name="Receitas"
          />

          <Bar
            dataKey="despesas"
            name="Despesas"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}