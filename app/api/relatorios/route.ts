import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {

  try {


    const movimentacoes = await prisma.movimentacao.findMany();



    const receitas = movimentacoes
      .filter((item) => item.tipo === "receita")
      .reduce(
        (total, item) => total + item.valor,
        0
      );



    const despesas = movimentacoes
      .filter((item) => item.tipo === "despesa")
      .reduce(
        (total, item) => total + item.valor,
        0
      );



    const saldo = receitas - despesas;



    return NextResponse.json({

      receitas,

      despesas,

      saldo,

    });



  } catch (error) {


    console.log(error);


    return NextResponse.json(
      {
        erro:"Erro ao gerar relatório"
      },
      {
        status:500
      }
    );


  }

}