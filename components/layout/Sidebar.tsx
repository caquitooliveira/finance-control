"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  Wallet,
  BarChart3,
  Target,
  Settings,
  Menu,
  X,
} from "lucide-react";


export default function Sidebar() {

  const [aberto, setAberto] = useState(false);

  const pathname = usePathname();


  const menus = [
    {
      nome: "Dashboard",
      href: "/dashboard",
      icone: Home,
    },
    {
      nome: "Movimentações",
      href: "/movimentacoes",
      icone: Wallet,
    },
    {
      nome: "Relatórios",
      href: "/relatorios",
      icone: BarChart3,
    },
    {
      nome: "Metas",
      href: "/metas",
      icone: Target,
    },
    {
      nome: "Configurações",
      href: "/configuracoes",
      icone: Settings,
    },
  ];


  return (
    <>

      {/* Botão Mobile */}

      <button
        onClick={() => setAberto(!aberto)}
        className="
          md:hidden
          fixed
          top-4
          left-4
          z-50
          bg-purple-600
          text-white
          p-2
          rounded-lg
          shadow-lg
        "
      >
        {aberto ? <X size={22} /> : <Menu size={22} />}
      </button>



      {/* Sidebar */}

      <aside
        className={`
          fixed
          md:static
          top-0
          left-0
          z-40
          h-screen
          w-64
          bg-gray-900
          text-white
          p-5
          flex
          flex-col
          justify-between
          transition-transform
          duration-300

          ${aberto ? "translate-x-0" : "-translate-x-full"}

          md:translate-x-0
        `}
      >


        <div>

          {/* Logo */}
          <div className="mb-8">

            <h2 className="text-2xl font-bold text-purple-500">
              Finance
            </h2>

            <p className="text-gray-400 text-sm">
              Control
            </p>

          </div>



          {/* Menu */}
          
          <nav>

            <ul className="space-y-3">

              {menus.map((menu) => {

                const Icon = menu.icone;

                const ativo = pathname === menu.href;


                return (

                  <li key={menu.href}>

                    <Link
                      href={menu.href}
                      onClick={() => setAberto(false)}
                      className={`
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        p-3
                        transition

                        ${
                          ativo
                            ? "bg-purple-600 text-white"
                            : "hover:bg-gray-800 text-gray-300"
                        }
                      `}
                    >

                      <Icon size={20} />

                      {menu.nome}

                    </Link>

                  </li>

                );

              })}

            </ul>

          </nav>

        </div>



        {/* Perfil */}

        <div
          className="
            border-t
            border-gray-700
            pt-4
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              w-10
              h-10
              rounded-full
              bg-purple-600
              flex
              items-center
              justify-center
              font-bold
            "
          >
            C
          </div>


          <div>

            <p className="font-semibold">
              Caio Oliveira
            </p>

            <p className="text-sm text-gray-400">
              Usuário
            </p>

          </div>


        </div>


      </aside>

    </>
  );
}