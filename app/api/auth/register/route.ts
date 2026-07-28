import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { nome, email, senha } = body;

    // Validação
    if (!nome || !email || !senha) {
      return NextResponse.json(
        { erro: "Preencha todos os campos." },
        { status: 400 }
      );
    }

    // Verifica se já existe um usuário
    const usuarioExistente = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (usuarioExistente) {
      return NextResponse.json(
        { erro: "Este e-mail já está cadastrado." },
        { status: 409 }
      );
    }

    // Criptografa a senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Salva o usuário
    const usuario = await prisma.user.create({
      data: {
        nome,
        email,
        senha: senhaHash,
      },
    });

    return NextResponse.json(
      {
        mensagem: "Usuário criado com sucesso.",
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { erro: "Erro ao cadastrar usuário." },
      { status: 500 }
    );
  }
}