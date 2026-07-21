"use client";

import { useEffect, useState } from "react";

import Card from "@/components/dashboard/Cards";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { formatarMoeda } from "@/utils/formatarMoeda";
import GraficoMensal from 
'@/app/(app)/relatorios/GraficoMensal'


export default function Relatorios() {

  type Movimentacao = {
  id:number;
  descricao:string;
  valor:number;
  tipo:string;
  categoria:string;
  data:string;
};


const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);


  useEffect(() => {

    async function carregarMovimentacoes() {

      const resposta = await fetch("/api/movimentacoes");

      const dados = await resposta.json();

      setMovimentacoes(dados);

    }


    carregarMovimentacoes();

  }, []);



  const receitas = movimentacoes
    .filter((mov) => mov.tipo === "receita")
    .reduce((total, mov) => total + mov.valor, 0);



  const despesas = movimentacoes
    .filter((mov) => mov.tipo === "despesa")
    .reduce((total, mov) => total + mov.valor, 0);



  const saldo = receitas - despesas;



  const cards = [
    {
      titulo: "Saldo Atual",
      valor: formatarMoeda(saldo),
      cor: "border-purple-600",
      icone: <Wallet size={28} />,
    },

    {
      titulo: "Total Receitas",
      valor: formatarMoeda(receitas),
      cor: "border-green-500",
      icone: <TrendingUp size={28} />,
    },

    {
      titulo: "Total Despesas",
      valor: formatarMoeda(despesas),
      cor: "border-red-500",
      icone: <TrendingDown size={28} />,
    },
  ];

  const dadosMensais = [
  {
    mes: "Jan",
    receitas: receitas,
    despesas: despesas,
  },
  {
    mes: "Fev",
    receitas: 0,
    despesas: 0,
  },
  {
    mes: "Mar",
    receitas: 0,
    despesas: 0,
  },
];



  return (

    <>

      <h1 className="text-3xl font-bold text-gray-700 mb-2">
        Relatórios
      </h1>


      <p className="text-gray-500 mb-6">
        Análise geral das suas movimentações financeiras.
      </p>



      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-5
      ">

        {cards.map((card) => (

          <Card
            key={card.titulo}
            titulo={card.titulo}
            valor={card.valor}
            cor={card.cor}
            icone={card.icone}
          />

          
        ))}

        <GraficoMensal
         dados={dadosMensais}
                 />

      </div>


    </>

  );
}