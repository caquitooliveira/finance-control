"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


type Props = {
  dados: {
    [categoria: string]: number;
  };
};


export default function GraficoCategorias({
  dados,
}: Props) {


  const categorias = Object.entries(dados).map(
    ([nome, valor]) => ({
      nome,
      valor,
    })
  );


  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">

      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Gastos por categoria
      </h2>


      <p className="text-sm text-gray-500 mb-6">
        Distribuição das despesas
      </p>


      {categorias.length === 0 ? (

        <p className="text-gray-500">
          Adicione despesas para visualizar o gráfico.
        </p>

      ) : (

        <ResponsiveContainer width="100%" height={320}>

          <PieChart>

            <Pie
              data={categorias}
              dataKey="valor"
              nameKey="nome"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >

              {categorias.map((_, index) => (

                <Cell
                  key={`cell-${index}`}
                  fill={[
                    "#820ad1",
                    "#22c55e",
                    "#ef4444",
                    "#f59e0b",
                    "#3b82f6",
                  ][index % 5]}
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