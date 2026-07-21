"use client";

import { Settings, Code2, Database, Palette } from "lucide-react";


export default function Configuracoes() {

  return (

    <div>

      <div className="mb-6">

        <h1 className="text-3xl font-bold text-gray-800">
          Configurações
        </h1>

        <p className="text-gray-500 mt-1">
          Informações e preferências do sistema.
        </p>

      </div>



      <div className="grid gap-6 md:grid-cols-2">


        <div className="
          bg-white
          rounded-2xl
          border
          border-gray-200
          p-6
          shadow-sm
        ">

          <div className="flex items-center gap-3 mb-4">

            <div className="
              bg-purple-100
              p-3
              rounded-xl
            ">

              <Settings 
                className="text-purple-600"
                size={24}
              />

            </div>


            <h2 className="text-xl font-bold text-gray-800">
              Sistema
            </h2>

          </div>


          <p className="text-gray-600">
            Finance Control
          </p>


          <p className="text-sm text-gray-500 mt-2">
            Versão 1.0.0
          </p>


        </div>





        <div className="
          bg-white
          rounded-2xl
          border
          border-gray-200
          p-6
          shadow-sm
        ">


          <div className="flex items-center gap-3 mb-4">

            <div className="
              bg-blue-100
              p-3
              rounded-xl
            ">

              <Code2
                className="text-blue-600"
                size={24}
              />

            </div>


            <h2 className="text-xl font-bold text-gray-800">
              Tecnologias
            </h2>


          </div>



          <ul className="text-gray-600 space-y-2">

            <li>• Next.js</li>

            <li>• React + TypeScript</li>

            <li>• Tailwind CSS</li>

            <li>• Prisma ORM</li>

            <li>• SQLite</li>

          </ul>


        </div>





        <div className="
          bg-white
          rounded-2xl
          border
          border-gray-200
          p-6
          shadow-sm
        ">


          <div className="flex items-center gap-3 mb-4">

            <div className="
              bg-green-100
              p-3
              rounded-xl
            ">

              <Database
                className="text-green-600"
                size={24}
              />

            </div>


            <h2 className="text-xl font-bold text-gray-800">
              Banco de Dados
            </h2>


          </div>



          <p className="text-gray-600">
            Prisma conectado ao SQLite.
          </p>


          <p className="text-sm text-gray-500 mt-2">
            Persistência local ativa.
          </p>


        </div>





        <div className="
          bg-white
          rounded-2xl
          border
          border-gray-200
          p-6
          shadow-sm
        ">


          <div className="flex items-center gap-3 mb-4">

            <div className="
              bg-orange-100
              p-3
              rounded-xl
            ">

              <Palette
                className="text-orange-600"
                size={24}
              />

            </div>


            <h2 className="text-xl font-bold text-gray-800">
              Interface
            </h2>


          </div>



          <p className="text-gray-600">
            Design responsivo desenvolvido com Tailwind CSS.
          </p>


        </div>


      </div>


    </div>

  );

}