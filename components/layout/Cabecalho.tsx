"use client";

import { useState, useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import {
  LogOut,
  ChevronDown,
} from "lucide-react";

export default function Cabecalho() {
  const { data: session } = useSession();

  const [menuAberto, setMenuAberto] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);


  const nome = session?.user?.name ?? "Usuário";
  const email = session?.user?.email ?? "";
  const inicial = nome.charAt(0).toUpperCase();


  useEffect(() => {

    function fecharMenu(event: MouseEvent) {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuAberto(false);
      }

    }


    document.addEventListener(
      "mousedown",
      fecharMenu
    );


    return () => {
      document.removeEventListener(
        "mousedown",
        fecharMenu
      );
    };


  }, []);



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

        <h2
          className="
            text-xl
            md:text-2xl
            font-bold
            text-purple-700
            dark:text-purple-400
          "
        >
          Finance Control
        </h2>


        <p
          className="
            text-sm
            text-gray-500
            dark:text-gray-400
          "
        >
          Controle suas finanças de forma simples
        </p>

      </div>



      <div className="flex items-center gap-4">


        <ThemeToggle />


        <div
          ref={menuRef}
          className="relative"
        >


          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="
              flex
              items-center
              gap-3
              rounded-xl
              px-3
              py-2
              transition
              hover:bg-gray-100
              dark:hover:bg-gray-800
            "
          >


            <div className="text-right hidden sm:block">

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Olá,
              </p>


              <p className="font-semibold text-gray-800 dark:text-white">
                {nome}
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
              {inicial}
            </div>



            <ChevronDown
              size={18}
              className={`
                transition-transform
                ${menuAberto ? "rotate-180" : ""}
              `}
            />

          </button>



          {menuAberto && (

            <div
              className="
                absolute
                right-0
                mt-2
                w-64
                rounded-xl
                border
                bg-white
                dark:bg-gray-900
                shadow-xl
                overflow-hidden
                z-50
              "
            >


              <div className="border-b p-4">


                <div className="flex items-center gap-3">


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
                    {inicial}
                  </div>


                  <div>

                    <p className="font-semibold">
                      {nome}
                    </p>

                    <p className="text-sm text-gray-500">
                      {email}
                    </p>

                  </div>


                </div>


              </div>



              <button
                onClick={() =>
                  signOut({
                    redirectTo: "/login",
                  })
                }
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-red-600
                  hover:bg-red-50
                  dark:hover:bg-red-900/20
                  transition
                "
              >

                <LogOut size={18} />

                Sair

              </button>


            </div>

          )}


        </div>


      </div>


    </header>
  );
}