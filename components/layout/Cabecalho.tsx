import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Cabecalho() {
  return (
    <header
      className="
        bg-white
        dark:bg-gray-900
        shadow-sm
        px-4
        md:px-8
        py-4
        flex
        flex-col
        sm:flex-row
        items-start
        sm:items-center
        justify-between
        gap-4
      "
    >

      <div>

        <h2 className="
          text-xl
          md:text-2xl
          font-bold
          text-purple-700
          dark:text-purple-400
        ">
          Finance Control
        </h2>


        <p className="
          text-sm
          text-gray-500
          dark:text-gray-400
        ">
          Controle suas finanças de forma simples
        </p>

      </div>



      <div className="flex items-center gap-3">


        <ThemeToggle />


        <div className="text-right">

          <p className="
            text-sm
            text-gray-500
            dark:text-gray-400
          ">
            Olá,
          </p>


          <p className="
            font-semibold
            text-gray-800
            dark:text-white
          ">
            Caio 👋
          </p>


        </div>



        <div
          className="
            w-10
            h-10
            rounded-full
            bg-purple-600
            text-white
            flex
            items-center
            justify-center
            font-bold
          "
        >
          C
        </div>


      </div>


    </header>
  );
}