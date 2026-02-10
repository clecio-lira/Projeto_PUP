import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";
import { TbPlantOff } from "react-icons/tb";

const notFound = () => {
  return (
    <main className="bg-green-50 h-screen flex flex-col items-center pt-20 gap-4">
      <h2 className="text-2xl uppercase tracking-widest underline underline-offset-8 text-green-900">
        Página não encontrada
      </h2>

      <p className="text-green-900">A pagina que você procura não existe.</p>

      <TbPlantOff size={50} color="red" className="mb-10"/>

      <Button variant="outlined" color="success">
        <Link href={"/"}>Voltar para o início</Link>
      </Button>
    </main>
  );
};

export default notFound;
