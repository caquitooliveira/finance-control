"use client";

import { useEffect, useState } from "react";

import FormMovimentacao from "@/components/movimentacoes/FormMovimentacao";
import ListaMovimentacoes from "@/components/movimentacoes/ListaMovimentacoes";
import Modal from "@/components/ui/Modal";

export default function Movimentacoes() {

  const [movimentacoes, setMovimentacoes] = useState<any[]>([]);
  const [modalAberto, setModalAberto] = useState(false);

  const [movimentacaoEditando, setMovimentacaoEditando] =
    useState<any | null>(null);


  useEffect(() => {

    async function carregarMovimentacoes() {

      const resposta = await fetch("/api/movimentacoes");

      const dados = await resposta.json();

      setMovimentacoes(dados);

    }

    carregarMovimentacoes();

  }, []);


  function fecharModal() {
    setModalAberto(false);
    setMovimentacaoEditando(null);
  }


  function abrirModal() {
    setModalAberto(true);
  }


  return (
    <>

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold text-gray-700">
            Movimentações
          </h1>

          <p className="text-gray-500">
            Gerencie suas entradas e saídas
          </p>
        </div>


        <button
          onClick={() => setModalAberto(true)}
          className="
          bg-purple-600
          hover:bg-purple-700
          text-white
          px-6
          py-3
          rounded-xl
          font-semibold
          "
        >
          + Nova movimentação
        </button>

      </div>



      <Modal
        aberto={modalAberto}
        fechar={fecharModal}
      >

        <FormMovimentacao
          setMovimentacoes={setMovimentacoes}
          movimentacoes={movimentacoes}
          movimentacaoEditando={movimentacaoEditando}
          setMovimentacaoEditando={setMovimentacaoEditando}
          fecharModal={fecharModal}
        />

      </Modal>



      <ListaMovimentacoes

        movimentacoes={movimentacoes}

        setMovimentacoes={setMovimentacoes}

        setMovimentacaoEditando={setMovimentacaoEditando}

        abrirModal={abrirModal}

      />


    </>
  );
}