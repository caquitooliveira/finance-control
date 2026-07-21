import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


// DELETE
export async function DELETE(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {

  try {

    const { id } = await context.params;


    await prisma.movimentacao.delete({
      where: {
        id: Number(id),
      },
    });


    return NextResponse.json({
      mensagem: "Movimentação excluída",
    });


  } catch (error) {

    console.log(error);


    return NextResponse.json(
      {
        erro: "Erro ao excluir movimentação",
      },
      {
        status: 500,
      }
    );

  }

}



// PUT
export async function PUT(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {

  try {

    const { id } = await context.params;


    const body = await request.json();


    const movimentacao = await prisma.movimentacao.update({

      where: {
        id: Number(id),
      },


      data: {

        descricao: body.descricao,

        valor: Number(body.valor),

        tipo: body.tipo,

        categoria: body.categoria,

      },

    });


    return NextResponse.json(movimentacao);


  } catch (error) {

    console.log(error);


    return NextResponse.json(
      {
        erro: "Erro ao atualizar movimentação",
      },
      {
        status: 500,
      }
    );

  }

}