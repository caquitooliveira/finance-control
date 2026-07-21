import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


// Buscar metas
export async function GET() {
  try {

    const metas = await prisma.meta.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(metas);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { erro: "Erro ao buscar metas" },
      { status: 500 }
    );

  }
}


// Criar meta
export async function POST(request: Request) {

  try {

    const body = await request.json();


    const meta = await prisma.meta.create({
      data: {
        titulo: body.titulo,
        valorMeta: Number(body.valorMeta),
        valorAtual: Number(body.valorAtual),
      },
    });


    return NextResponse.json(meta, {
      status: 201,
    });


  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { erro: "Erro ao criar meta" },
      { status: 500 }
    );

  }

}