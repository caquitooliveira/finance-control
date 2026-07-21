import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


// Buscar movimentações

export async function GET() {
  try {
    const movimentacoes = await prisma.movimentacao.findMany({
      orderBy: {
        data: "desc",
      },
    });

    return NextResponse.json(movimentacoes);

  } catch (error) {

    return NextResponse.json(
      { erro: "Erro ao buscar movimentações" },
      { status: 500 }
    );

  }
}



// Criar movimentação

export async function POST(request: Request) {

  try {

    const body = await request.json();


    const movimentacao = await prisma.movimentacao.create({
      data: {
        descricao: body.descricao,
        valor: Number(body.valor),
        tipo: body.tipo,
        categoria: body.categoria,
      },
    });


    return NextResponse.json(movimentacao);


  } catch (error) {

    return NextResponse.json(
      { erro: "Erro ao criar movimentação" },
      { status: 500 }
    );

  }

}