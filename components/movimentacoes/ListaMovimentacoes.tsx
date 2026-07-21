import { formatarMoeda } from "@/utils/formatarMoeda";

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
  setMovimentacaoEditando: React.Dispatch<
    React.SetStateAction<Movimentacao | null>
  >;
  abrirModal: () => void;
};

export default function ListaMovimentacoes({
  movimentacoes,
  setMovimentacoes,
  setMovimentacaoEditando,
  abrirModal,
}: Props) {


  async function excluirMovimentacao(id: number) {

    const resposta = await fetch(`/api/movimentacoes/${id}`, {
      method: "DELETE",
    });


    if (resposta.ok) {

      setMovimentacoes(
        movimentacoes.filter((mov) => mov.id !== id)
      );

    }

  }


  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">

      <h2 className="text-xl font-bold text-gray-800 mb-5">
        Últimas movimentações
      </h2>


      {movimentacoes.length === 0 ? (

        <p className="text-gray-500">
          Nenhuma movimentação cadastrada.
        </p>

      ) : (

        <div className="space-y-4">

          {movimentacoes.map((mov) => (

            <div
              key={mov.id}
              className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-4
                p-5
                rounded-2xl
                border
                border-gray-100
                hover:shadow-md
                transition
              "
            >


              <div className="flex items-center gap-4">

                <div
                  className={`
                    w-12
                    h-12
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-xl
                    ${
                      mov.tipo === "receita"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }
                  `}
                >
                  {mov.tipo === "receita" ? "📈" : "📉"}
                </div>



                <div>

                  <p className="font-semibold text-gray-800">
                    {mov.descricao}
                  </p>


                  <div className="flex flex-wrap gap-2 text-sm mt-1">

                    <span className="text-gray-500">
                      🏷️ {mov.categoria}
                    </span>


                    <span className="text-gray-400">
                      📅 {mov.data}
                    </span>


                    <span
                      className={
                        mov.tipo === "receita"
                          ? "text-green-600 capitalize"
                          : "text-red-600 capitalize"
                      }
                    >
                      • {mov.tipo}
                    </span>

                  </div>

                </div>

              </div>




              <div className="
                flex
                flex-col
                md:flex-row
                md:items-center
                gap-3
              ">


                <p
                  className={`
                    font-bold
                    text-lg
                    ${
                      mov.tipo === "receita"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  `}
                >

                  {mov.tipo === "receita" ? "+" : "-"}

                  {formatarMoeda(mov.valor)}

                </p>



                <div className="flex gap-2">


                  <button
                    onClick={() => {
                      setMovimentacaoEditando(mov);
                      abrirModal();
                    }}
                    className="
                      bg-purple-600
                      hover:bg-purple-700
                      text-white
                      px-4
                      py-2
                      rounded-xl
                      text-sm
                      transition
                    "
                  >
                    Editar
                  </button>




                  <button
                    onClick={() => excluirMovimentacao(mov.id)}
                    className="
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      px-4
                      py-2
                      rounded-xl
                      text-sm
                      transition
                    "
                  >
                    Excluir
                  </button>


                </div>


              </div>


            </div>

          ))}

        </div>

      )}

    </div>
  );
}