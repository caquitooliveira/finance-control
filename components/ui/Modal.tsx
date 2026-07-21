"use client";

type Props = {
  children: React.ReactNode;
  aberto: boolean;
  fechar: () => void;
};


export default function Modal({
  children,
  aberto,
  fechar,
}: Props) {

  if (!aberto) return null;


  return (
    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
        p-4
      "
    >

      <div
        className="
          bg-white
          rounded-2xl
          shadow-xl
          w-full
          max-w-lg
          relative
          p-6
        "
      >

        <button
          onClick={fechar}
          className="
            absolute
            top-4
            right-4
            text-gray-500
            hover:text-gray-800
            text-xl
          "
        >
          ✕
        </button>


        {children}


      </div>

    </div>
  );
}