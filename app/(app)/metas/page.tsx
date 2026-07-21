"use client";

import { useEffect, useState } from "react";

import CardMeta from "@/components/metas/CardMeta";
import Modal from "@/components/ui/Modal";
import FormMeta from "@/components/metas/FormMeta";

type Meta = {
  id: number;
  titulo: string;
  valorMeta: number;
  valorAtual: number;
};

export default function Metas() {

  const [metas, setMetas] = useState<Meta[]>([]);

  const [modalAberto, setModalAberto] = useState(false);

  const [metaEditando, setMetaEditando] = useState<Meta | null>(null);


  // Buscar metas do banco
  async function buscarMetas() {

    try {

      const resposta = await fetch("/api/metas");

      const dados = await resposta.json();

      setMetas(dados);


    } catch (error) {

      console.log("Erro ao buscar metas:", error);

    }

  }


  useEffect(() => {

    buscarMetas();

  }, []);



  function fecharModal() {

    setModalAberto(false);

    setMetaEditando(null);

  }



  function editarMeta(id: number) {

    const meta = metas.find((meta) => meta.id === id);


    if (meta) {

      setMetaEditando(meta);

      setModalAberto(true);

    }

  }



  async function excluirMeta(id: number) {

    try {

      await fetch(`/api/metas/${id}`, {
        method: "DELETE",
      });


      setMetas((metasAtuais) =>
        metasAtuais.filter((meta) => meta.id !== id)
      );


    } catch (error) {

      console.log("Erro ao excluir meta:", error);

    }

  }



  return (

    <>

      <div className="flex items-center justify-between mb-6">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Metas Financeiras
          </h1>


          <p className="text-gray-500 mt-1">
            Acompanhe o progresso das suas metas.
          </p>


        </div>



        <button

          onClick={() => setModalAberto(true)}

          className="
            bg-purple-600
            hover:bg-purple-700
            text-white
            px-5
            py-3
            rounded-xl
            transition
          "

        >

          + Nova Meta

        </button>


      </div>



      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">


        {metas.map((meta) => (


          <CardMeta

            key={meta.id}

            id={meta.id}

            titulo={meta.titulo}

            valorMeta={meta.valorMeta}

            valorAtual={meta.valorAtual}

            editar={editarMeta}

            excluir={excluirMeta}

          />


        ))}


      </div>



      <Modal

        aberto={modalAberto}

        fechar={fecharModal}

      >


        <FormMeta

          metas={metas}

          setMetas={setMetas}

          metaEditando={metaEditando}

          setMetaEditando={setMetaEditando}

          fecharModal={fecharModal}

        />


      </Modal>


    </>

  );

}