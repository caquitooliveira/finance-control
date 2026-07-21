"use client";

import { useState, useEffect } from "react";

type Movimentacao = {
  id: number;
  descricao: string;
  valor: number;
  tipo: string;
  categoria: string;
  data: string;
};

type Props = {
  movimentacoes: Movimentacao[];
  setMovimentacoes: React.Dispatch<React.SetStateAction<Movimentacao[]>>;
  movimentacaoEditando: Movimentacao | null;
  setMovimentacaoEditando: React.Dispatch<
    React.SetStateAction<Movimentacao | null>
  >;
  fecharModal: () => void;
};

export default function FormMovimentacao({
  setMovimentacoes,
  movimentacoes,
  movimentacaoEditando,
  setMovimentacaoEditando,
  fecharModal,
}: Props) {

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("receita");
  const [categoria, setCategoria] = useState("Outros");


  useEffect(() => {

    if (movimentacaoEditando) {

      setDescricao(movimentacaoEditando.descricao);
      setValor(movimentacaoEditando.valor.toString());
      setTipo(movimentacaoEditando.tipo);
      setCategoria(movimentacaoEditando.categoria);

    }

  }, [movimentacaoEditando]);



  async function adicionarMovimentacao(e: React.FormEvent) {
  e.preventDefault();


  const dadosMovimentacao = {
    descricao,
    valor: Number(valor),
    tipo,
    categoria,
  };


  // EDITAR

  if (movimentacaoEditando) {

    const resposta = await fetch(
      `/api/movimentacoes/${movimentacaoEditando.id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(dadosMovimentacao),
      }
    );


    const movimentacaoAtualizada = await resposta.json();


    setMovimentacoes((prev) =>
      prev.map((mov) =>
        mov.id === movimentacaoAtualizada.id
          ? movimentacaoAtualizada
          : mov
      )
    );


    setMovimentacaoEditando(null);


  } 
  
  // CRIAR

  else {

    const resposta = await fetch(
      "/api/movimentacoes",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(dadosMovimentacao),
      }
    );


    const movimentacaoCriada = await resposta.json();


    setMovimentacoes((prev) => [
      ...prev,
      movimentacaoCriada,
    ]);

  }


  setDescricao("");
  setValor("");
  setTipo("receita");
  setCategoria("Outros");

  fecharModal();

}



  return (

    <form
      onSubmit={adicionarMovimentacao}
      className="
        bg-white
        rounded-2xl
        shadow-sm
        p-6
        border
        border-gray-100
      "
    >

      <h2 className="text-xl font-bold text-gray-800 mb-6">
        ➕ Nova movimentação
      </h2>


      <div className="space-y-4">


        <div>

          <label className="text-sm text-gray-600">
            Descrição
          </label>

          <input
            type="text"
            placeholder="Ex: Salário, aluguel..."
            value={descricao}
            onChange={(e)=>setDescricao(e.target.value)}
            className="
              mt-1
              w-full
              rounded-xl
              border
              border-gray-200
              p-3
              text-gray-800
              outline-none
              focus:ring-2
              focus:ring-purple-500
            "
          />

        </div>



        <div>

          <label className="text-sm text-gray-600">
            Valor
          </label>


          <input
            type="number"
            placeholder="R$ 0,00"
            value={valor}
            onChange={(e)=>setValor(e.target.value)}
            className="
              mt-1
              w-full
              rounded-xl
              border
              border-gray-200
              p-3
              text-gray-800
              outline-none
              focus:ring-2
              focus:ring-purple-500
            "
          />

        </div>



        <div>

          <label className="text-sm text-gray-600">
            Tipo
          </label>


          <select
            value={tipo}
            onChange={(e)=>setTipo(e.target.value)}
            className="
              mt-1
              w-full
              rounded-xl
              border
              border-gray-200
              p-3
              text-gray-800
              outline-none
              focus:ring-2
              focus:ring-purple-500
            "
          >

            <option value="receita">
              📈 Receita
            </option>

            <option value="despesa">
              📉 Despesa
            </option>

          </select>

        </div>



        <div>

          <label className="text-sm text-gray-600">
            Categoria
          </label>


          <select
            value={categoria}
            onChange={(e)=>setCategoria(e.target.value)}
            className="
              mt-1
              w-full
              rounded-xl
              border
              border-gray-200
              p-3
              text-gray-800
              outline-none
              focus:ring-2
              focus:ring-purple-500
            "
          >

            <option value="Moradia">
              🏠 Moradia
            </option>

            <option value="Alimentação">
              🍔 Alimentação
            </option>

            <option value="Transporte">
              🚗 Transporte
            </option>

            <option value="Lazer">
              🎮 Lazer
            </option>

            <option value="Outros">
              📦 Outros
            </option>

          </select>

        </div>



        <button
          type="submit"
          className="
            w-full
            bg-purple-600
            hover:bg-purple-700
            text-white
            font-semibold
            py-3
            rounded-xl
            transition
          "
        >

          {movimentacaoEditando
           ? "Salvar alterações"
          : "Adicionar lançamento"}

        </button>


      </div>


    </form>

  );
}
