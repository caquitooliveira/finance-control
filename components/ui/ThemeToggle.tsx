"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";


export default function ThemeToggle() {

  const [dark, setDark] = useState(false);


  useEffect(() => {

    const tema = localStorage.getItem("tema");


    if (tema === "dark") {

      document.documentElement.classList.add("dark");

      setDark(true);

    }

  }, []);



  function alternarTema() {

    const html = document.documentElement;


    if (html.classList.contains("dark")) {

      html.classList.remove("dark");

      localStorage.setItem("tema", "light");

      setDark(false);


    } else {

      html.classList.add("dark");

      localStorage.setItem("tema", "dark");

      setDark(true);

    }

  }



  return (

    <button
      onClick={alternarTema}
      className="
        p-2
        rounded-xl
        bg-gray-100
        dark:bg-gray-800
        transition
      "
    >

      {dark ? (
        <Sun size={20}/>
      ) : (
        <Moon size={20}/>
      )}

    </button>

  );

}