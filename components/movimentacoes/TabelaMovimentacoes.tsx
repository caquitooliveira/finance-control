import { movimentacoes } from "@/services/movimentacoes";

export default function TabelaMovimentacoes() {
  return (
    <div className="mt-8 rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Últimas movimentações</h2>

      <table className="w-full">
        <thead>
          <tr className="border-b text-gray-700">
            <th className="py-2 text-left">Descrição</th>
            <th className="py-2 text-left">Categoria</th>
            <th className="py-2 text-left">Tipo</th>
            <th className="py-2 text-right">Valor</th>
          </tr>
        </thead>

        <tbody>
          {movimentacoes.map((movimentacao) => (
            <tr key={movimentacao.id} className="border-b text-gray-900">
              <td className="py-3">{movimentacao.descricao}</td>
              <td>{movimentacao.categoria}</td>
              <td>{movimentacao.tipo}</td>
              <td className="text-right">
                R$ {movimentacao.valor.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}