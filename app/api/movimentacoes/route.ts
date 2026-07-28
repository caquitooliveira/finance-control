import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";


// Buscar movimentações

export async function GET() {

  const session = await auth();


  if (!session?.user?.email) {

    return NextResponse.json(
      { erro: "Não autorizado" },
      { status: 401 }
    );

  }


  try {


    const usuario = await prisma.user.findUnique({

      where: {
        email: session.user.email,
      },

    });



    if (!usuario) {

      return NextResponse.json(
        { erro: "Usuário não encontrado" },
        { status: 404 }
      );

    }



    const movimentacoes = await prisma.movimentacao.findMany({

      where: {
        userId: usuario.id,
      },


      orderBy: {
        data: "desc",
      },

    });



    return NextResponse.json(movimentacoes);



  } catch (error) {


    console.error(error);


    return NextResponse.json(
      { 
        erro: "Erro ao buscar movimentações",
        detalhe: String(error)
      },
      { status: 500 }
    );


  }

}





// Criar movimentação

export async function POST(request: Request) {


  const session = await auth();



  if (!session?.user?.email) {

    return NextResponse.json(
      { erro: "Não autorizado" },
      { status: 401 }
    );

  }



  try {


    const usuario = await prisma.user.findUnique({

      where: {
        email: session.user.email,
      },

    });



    if (!usuario) {

      return NextResponse.json(
        { erro: "Usuário não encontrado" },
        { status: 404 }
      );

    }




    const body = await request.json();



    const movimentacao = await prisma.movimentacao.create({

      data: {

        descricao: body.descricao,

        valor: Number(body.valor),

        tipo: body.tipo,

        categoria: body.categoria,

        userId: usuario.id,

      },

    });



    return NextResponse.json(movimentacao);



  } catch (error) {


    console.error(error);


    return NextResponse.json(
      { erro: "Erro ao criar movimentação" },
      { status: 500 }
    );


  }

}