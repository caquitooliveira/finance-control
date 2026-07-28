import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";


// Buscar metas

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




    const metas = await prisma.meta.findMany({

      where: {
        userId: usuario.id,
      },


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



    const meta = await prisma.meta.create({

      data: {

        titulo: body.titulo,

        valorMeta: Number(body.valorMeta),

        valorAtual: Number(body.valorAtual),

        userId: usuario.id,

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