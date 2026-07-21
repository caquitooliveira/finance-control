type Movimentacao = {
  id: number;
  descricao: string;
  valor: number;
  tipo: string;
  categoria: string;
};


type Props = {
  movimentacoes: Movimentacao[];
};


export default function UltimasMovimentacoes({
  movimentacoes,
}: Props) {

  const ultimas = movimentacoes.slice(-5).reverse();


  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm mt-6">

      <h2 className="text-xl font-bold text-gray-700 mb-4">
        Últimas movimentações
      </h2>


      <div className="space-y-3">

        {ultimas.map((mov) => (

          <div
            key={mov.id}
            className="flex justify-between items-center border-b pb-3"
          >

            <div>
              <p className="font-semibold text-gray-700">
                {mov.descricao}
              </p>

              <span className="text-sm text-gray-400">
                {mov.categoria}
              </span>
            </div>


            <span
              className={
                mov.tipo === "receita"
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
              }
            >
              {mov.tipo === "receita" ? "+" : "-"} 
              R$ {mov.valor.toFixed(2)}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}