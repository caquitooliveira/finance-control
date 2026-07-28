"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, Wallet } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
  e.preventDefault();

  if (!email || !senha) {
    alert("Preencha todos os campos.");
    return;
  }

  try {
    setLoading(true);

    const resultado = await signIn("credentials", {
      email,
      senha,
      redirect: false,
    });


    if (resultado?.error) {
      alert("Email ou senha inválidos.");
      return;
    }


    alert("Login realizado com sucesso!");

    router.push("/dashboard");


  } catch (error) {

    console.error(error);
    alert("Erro ao realizar login.");

  } finally {

    setLoading(false);

  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-violet-600 text-white">
            <Wallet size={30} />
          </div>

          <h1 className="mt-4 text-3xl font-bold text-slate-800">
            Finance Control
          </h1>

          <p className="mt-2 text-center text-slate-500">
            Controle suas finanças com segurança.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <div className="flex items-center rounded-lg border px-3">
              <Mail className="text-slate-400" size={20} />

              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          {/* Senha */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Senha
            </label>

            <div className="flex items-center rounded-lg border px-3">
              <Lock className="text-slate-400" size={20} />

              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full p-3 outline-none"
              />

              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? (
                  <EyeOff size={20} className="text-slate-500" />
                ) : (
                  <Eye size={20} className="text-slate-500" />
                )}
              </button>
            </div>
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full rounded-lg bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            {loading ? "Entrando..." : "Entrar"}
            
          </button>
        </form>

        {/* Cadastro */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Não possui uma conta?{" "}
          <Link
            href="/register"
            className="font-semibold text-violet-600 hover:underline"
          >
            Cadastre-se
          </Link>
        </p>

      </div>
    </div>
  );
}