"use client";

import { useEffect, useState } from "react";

type Meta = {
  id: number;
  titulo: string;
  valorMeta: number;
  valorAtual: number;
};

type Props = {
  metas: Meta[];
  setMetas: React.Dispatch<React.SetStateAction<Meta[]>>;
  metaEditando: Meta | null;
  setMetaEditando: React.Dispatch<React.SetStateAction<Meta | null>>;
  fecharModal: () => void;
};

export default function FormMeta({
  setMetas,
  metaEditando,
  setMetaEditando,
  fecharModal,
}: Props) {

  const [titulo, setTitulo] = useState("");

  const [valorMeta, setValorMeta] = useState("");

  const [valorAtual, setValorAtual] = useState("");



  useEffect(() => {

    if (metaEditando) {

      setTitulo(metaEditando.titulo);

      setValorMeta(metaEditando.valorMeta.toString());

      setValorAtual(metaEditando.valorAtual.toString());


    } else {

      setTitulo("");

      setValorMeta("");

      setValorAtual("");

    }

  }, [metaEditando]);




  async function salvarMeta(e: React.FormEvent) {

    e.preventDefault();


    const dados = {

      titulo,

      valorMeta: Number(valorMeta),

      valorAtual: Number(valorAtual),

    };



    try {


      let resposta;


      // EDITAR
      if (metaEditando?.id) {


        resposta = await fetch(`/api/metas/${metaEditando.id}`, {

          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(dados),

        });


      } 

      // CRIAR
      else {


        resposta = await fetch("/api/metas", {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(dados),

        });


      }



      const metaSalva = await resposta.json();



      if (metaEditando?.id) {


        setMetas((metasAtuais) =>

          metasAtuais.map((meta) =>

            meta.id === metaSalva.id

              ? metaSalva

              : meta

          )

        );


      } else {


        setMetas((metasAtuais) => [

          ...metasAtuais,

          metaSalva,

        ]);


      }




      setTitulo("");

      setValorMeta("");

      setValorAtual("");

      setMetaEditando(null);

      fecharModal();



    } catch (error) {


      console.log("Erro ao salvar meta:", error);


    }


  }




  return (

    <form onSubmit={salvarMeta} className="space-y-4">


      <h2 className="text-2xl font-bold text-gray-800">

        {metaEditando ? "Editar Meta" : "Nova Meta"}

      </h2>



      <input

        type="text"

        placeholder="Nome da meta"

        value={titulo}

        onChange={(e) => setTitulo(e.target.value)}

        className="w-full rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"

        required

      />



      <input

        type="number"

        placeholder="Valor da Meta"

        value={valorMeta}

        onChange={(e) => setValorMeta(e.target.value)}

        className="w-full rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"

        required

      />



      <input

        type="number"

        placeholder="Valor Atual"

        value={valorAtual}

        onChange={(e) => setValorAtual(e.target.value)}

        className="w-full rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"

        required

      />



      <button

        type="submit"

        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition"

      >

        {metaEditando ? "Salvar Alterações" : "Cadastrar Meta"}


      </button>



    </form>

  );

}