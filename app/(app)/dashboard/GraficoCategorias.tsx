"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";


type Props = {
  dados: {
    categoria: string;
    valor: number;
  }[];
};


export default function GraficoCategorias({
  dados,
}: Props) {


  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm mt-6">

      <h2 className="text-xl font-bold text-gray-700 mb-5">
        Gastos por categoria
      </h2>


      {dados.length === 0 ? (

        <p className="text-gray-400 text-center py-10">
          Nenhuma despesa registrada.
        </p>

      ) : (

        <ResponsiveContainer width="100%" height={300}>

          <PieChart>

            <Pie
              data={dados}
              dataKey="valor"
              nameKey="categoria"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >

              {dados.map((item, index) => (

                <Cell
                  key={index}
                />

              ))}

            </Pie>


            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      )}

    </div>
  );
}