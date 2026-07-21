import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


// Excluir meta
export async function DELETE(
  request: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {

  try {

    const { id } = await context.params;


    await prisma.meta.delete({
      where:{
        id:Number(id),
      },
    });


    return NextResponse.json({
      mensagem:"Meta excluída",
    });


  } catch(error){

    console.log(error);

    return NextResponse.json(
      {erro:"Erro ao excluir meta"},
      {status:500}
    );

  }

}


// Atualizar meta
export async function PUT(
  request: Request,
  context:{
    params:Promise<{id:string}>
  }
){

  try{

    const {id}=await context.params;

    const body=await request.json();


    const meta=await prisma.meta.update({

      where:{
        id:Number(id),
      },

      data:{
        titulo:body.titulo,
        valorMeta:Number(body.valorMeta),
        valorAtual:Number(body.valorAtual),
      },

    });


    return NextResponse.json(meta);


  }catch(error){

    console.log(error);

    return NextResponse.json(
      {erro:"Erro ao atualizar meta"},
      {status:500}
    );

  }

}