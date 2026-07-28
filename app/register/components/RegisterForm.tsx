"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, User, Wallet } from "lucide-react";

export default function RegisterForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (!nome || !email || !senha || !confirmarSenha) {
      alert("Preencha todos os campos.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.erro);
        return;
      }

      alert("Usuário cadastrado com sucesso!");

      setNome("");
      setEmail("");
      setSenha("");
      setConfirmarSenha("");

    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar usuário.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border">

        <div className="flex flex-col items-center mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-white">
            <Wallet size={30} />
          </div>

          <h1 className="mt-4 text-3xl font-bold text-slate-800">
            Criar Conta
          </h1>

          <p className="mt-2 text-center text-slate-500">
            Cadastre-se para começar a controlar suas finanças.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Nome
            </label>

            <div className="flex items-center rounded-lg border px-3">
              <User className="text-slate-400" size={20} />

              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <div className="flex items-center rounded-lg border px-3">
              <Mail className="text-slate-400" size={20} />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu email"
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Senha
            </label>

            <div className="flex items-center rounded-lg border px-3">
              <Lock className="text-slate-400" size={20} />

              <input
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Sua senha"
                className="w-full p-3 outline-none"
              />

              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Confirmar senha
            </label>

            <div className="flex items-center rounded-lg border px-3">
              <Lock className="text-slate-400" size={20} />

              <input
                type={mostrarConfirmacao ? "text" : "password"}
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="Confirme sua senha"
                className="w-full p-3 outline-none"
              />

              <button
                type="button"
                onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)}
              >
                {mostrarConfirmacao ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-violet-600 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Já possui uma conta?{" "}
          <Link
            href="/login"
            className="font-semibold text-violet-600 hover:underline"
          >
            Entrar
          </Link>
        </p>

      </div>
    </div>
  );
}