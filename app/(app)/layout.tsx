import Cabecalho from "@/components/layout/Cabecalho";
import Sidebar from "@/components/layout/Sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        min-h-screen
        bg-gray-100
        dark:bg-gray-950
        transition-colors
      "
    >

      <Cabecalho />


      <main
        className="
          flex
          flex-col
          md:flex-row
          min-h-screen
        "
      >

        <Sidebar />


        <div
          className="
            flex-1
            p-4
            md:p-6
            overflow-x-hidden
          "
        >

          {children}

        </div>


      </main>


    </div>
  );
}