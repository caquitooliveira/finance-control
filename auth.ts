import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        senha: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.senha) {
          return null;
        }

        const usuario = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!usuario) {
          return null;
        }

        const senhaValida = await bcrypt.compare(
          credentials.senha as string,
          usuario.senha
        );

        if (!senhaValida) {
          return null;
        }

        return {
          id: usuario.id,
          name: usuario.nome,
          email: usuario.email,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
});