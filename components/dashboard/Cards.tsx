import { ReactNode } from "react"

type CardProps = {
  titulo: string;
  valor: string;
  cor?: string;
  icone?: ReactNode;
};

export default function Card({
  titulo,
  valor,
  cor,
  icone,
}: CardProps) {
  return (
    <div
      className={`
        bg-white
        rounded-2xl
        p-6
        shadow-sm
        border-l-4
        ${cor || "border-purple-600"}
        hover:shadow-lg
        transition
      `}
    >

      <div className="flex items-center justify-between">

        <h3 className="text-sm font-medium text-gray-500">
          {titulo}
        </h3>

<div className={`${cor?.replace("border", "text") || "text-purple-600"}`}>
  {icone}
</div>

      </div>


      <p className="mt-4 text-3xl font-bold text-gray-900">
        {valor}
      </p>


      <p className="mt-2 text-sm text-gray-400">
        Atualizado hoje
      </p>

    </div>
  );
}