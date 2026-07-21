import BarraProgresso from "./BarraProgresso";
import { Target, Pencil, Trash2, CheckCircle } from "lucide-react";
import { formatarMoeda } from "@/utils/formatarMoeda";

type Props = {
  id: number;
  titulo: string;
  valorMeta: number;
  valorAtual: number;
  editar: (id: number) => void;
  excluir: (id: number) => void;
};

export default function CardMeta({
  id,
  titulo,
  valorMeta,
  valorAtual,
  editar,
  excluir,
}: Props) {


  const porcentagem = Math.min(
    (valorAtual / valorMeta) * 100,
    100
  );


  const restante = Math.max(
    valorMeta - valorAtual,
    0
  );


  const concluida = porcentagem >= 100;



  return (

    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition">


      <div className="flex items-center gap-3 mb-5">


        <div className="bg-purple-100 p-3 rounded-xl">

          {concluida ? (

            <CheckCircle 
              className="text-green-600"
              size={24}
            />

          ) : (

            <Target 
              className="text-purple-600"
              size={24}
            />

          )}

        </div>


        <div>

          <h2 className="font-bold text-lg text-gray-800">
            {titulo}
          </h2>


          <p className="text-sm text-gray-500">
            {concluida 
              ? "Meta concluída 🎉"
              : "Meta financeira"
            }
          </p>


        </div>


      </div>




      <div className="space-y-3">


        <div className="flex justify-between">

          <span className="text-gray-600">
            Objetivo
          </span>


          <strong className="text-gray-900">
            {formatarMoeda(valorMeta)}
          </strong>


        </div>



        <div className="flex justify-between">

          <span className="text-gray-600">
            Guardado
          </span>


          <strong className="text-purple-600">
            {formatarMoeda(valorAtual)}
          </strong>


        </div>


      </div>




      <div className="mt-5">


        <BarraProgresso
          atual={valorAtual}
          meta={valorMeta}
        />



        <div className="flex justify-between mt-2 text-sm">


          <span className="text-gray-500">
            {porcentagem.toFixed(0)}% concluído
          </span>



          {!concluida && (

            <span className="text-gray-500">
              Falta {formatarMoeda(restante)}
            </span>

          )}


        </div>


      </div>





      <div className="flex justify-end gap-2 mt-6">


        <button
          onClick={() => editar(id)}
          className="p-2 rounded-lg hover:bg-blue-100 transition"
          title="Editar"
        >

          <Pencil
            size={18}
            className="text-blue-600"
          />

        </button>




        <button
          onClick={() => excluir(id)}
          className="p-2 rounded-lg hover:bg-red-100 transition"
          title="Excluir"
        >

          <Trash2
            size={18}
            className="text-red-600"
          />

        </button>


      </div>


    </div>

  );
}