import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, senha } = body;


    // Validação

    if (!email || !senha) {
      return NextResponse.json(
        {
          erro: "Preencha todos os campos."
        },
        {
          status: 400
        }
      );
    }


    // Buscar usuário

    const usuario = await prisma.user.findUnique({
      where: {
        email,
      },
    });


    if (!usuario) {
      return NextResponse.json(
        {
          erro: "Email ou senha inválidos."
        },
        {
          status: 401
        }
      );
    }


    // Comparar senha

    const senhaValida = await bcrypt.compare(
      senha,
      usuario.senha
    );


    if (!senhaValida) {
      return NextResponse.json(
        {
          erro: "Email ou senha inválidos."
        },
        {
          status: 401
        }
      );
    }


    // Login realizado

    return NextResponse.json({
      mensagem: "Login realizado com sucesso.",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });


  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        erro: "Erro ao realizar login."
      },
      {
        status: 500
      }
    );

  }
}