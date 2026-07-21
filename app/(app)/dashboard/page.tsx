"use client";

import { useEffect, useState } from "react";

import Card from "@/components/dashboard/Cards";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import GraficoFinanceiro from "@/components/dashboard/GraficoFinanceiro";
import GraficoCategorias from "@/components/dashboard/GraficoCategorias";
import { formatarMoeda } from "@/utils/formatarMoeda";
import UltimasMovimentacoes from "@/app/(app)/dashboard/UltimasMovimentacoes";






export default function Home() {

  const [movimentacoes, setMovimentacoes] = useState<any[]>([]);


useEffect(() => {

  async function carregarMovimentacoes() {

    const resposta = await fetch("/api/movimentacoes");

    const dados = await resposta.json();

    setMovimentacoes(dados);

  }

  carregarMovimentacoes();

}, []);

  const totalReceitas = movimentacoes
    .filter((movimentacao) => movimentacao.tipo === "receita")
    .reduce((total, movimentacao) => total + movimentacao.valor, 0);

  const totalDespesas = movimentacoes
    .filter((movimentacao) => movimentacao.tipo === "despesa")
    .reduce((total, movimentacao) => total + movimentacao.valor, 0);

  const saldo = totalReceitas - totalDespesas;

const despesasPorCategoria: { [categoria: string]: number } =
  movimentacoes
    .filter((mov) => mov.tipo === "despesa")
    .reduce((acc: { [categoria: string]: number }, mov) => {
      if (!acc[mov.categoria]) {
        acc[mov.categoria] = 0;
      }

      acc[mov.categoria] += Number(mov.valor) || 0;

      return acc;
    }, {});


  const cards = [
    {
      titulo: "Saldo",
      valor: formatarMoeda(saldo),
      cor: "border-purple-600",
      icone: <Wallet size={28} />,
    },
    {
      titulo: "Receitas",
      valor: formatarMoeda(totalReceitas),
      cor: "border-green-500",
      icone: <TrendingUp size={28} />,
    },
    {
      titulo: "Despesas",
      valor: formatarMoeda(totalDespesas),
      cor: "border-red-500",
      icone: <TrendingDown size={28} />,
    },
  ];

  return (
    <>
          <h1 className="text-2xl md:text-3xl text-gray-700 font-bold mb-6">
                Dashboard
          </h1>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {cards.map((card) => (

              <Card
                key={card.titulo}
                titulo={card.titulo}
                valor={card.valor}
                cor={card.cor}
                icone={card.icone}
              />

            ))}

          </div>



<GraficoFinanceiro
  receitas={totalReceitas}
  despesas={totalDespesas}
/>

<GraficoCategorias
  dados={despesasPorCategoria}
/>

<UltimasMovimentacoes
  movimentacoes={movimentacoes}
/>




    </>
  );
}