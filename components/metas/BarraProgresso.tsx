type Props = {
  atual: number;
  meta: number;
};

export default function BarraProgresso({
  atual,
  meta,
}: Props) {

  const porcentagem =
    Math.min((atual / meta) * 100, 100);

  return (
    <div className="mt-4">

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

        <div
          className="h-full bg-purple-600 transition-all duration-500"
          style={{
            width: `${porcentagem}%`,
          }}
        />

      </div>

      <p className="text-sm text-gray-500 mt-2">
        {porcentagem.toFixed(0)}%
      </p>

    </div>
  );
}