"use client";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

interface Cep {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
}

const Cep = () => {
  const [cep, setCep] = useState("");
  const [resultCep, setResultCep] = useState<Cep>();

  const handleCep = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const dataCep = await res.json();
      setResultCep(dataCep);
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  return (
    <section>
      <div className="mt-4 flex gap-2">
        <TextField
          label="Calcule o CEP"
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          fullWidth
          required
          color="success"
        />
        <Button
          variant="contained"
          color="success"
          onClick={(e) => handleCep(e)}
        >
          <CiSearch />
        </Button>
      </div>

      <div>
        {resultCep ? (
          <div className="text-gray-600 border rounded-md border-gray-400 p-4 mt-2">
            <p>
              {resultCep.estado} - {resultCep.uf}
            </p>
            <p>{resultCep.localidade}</p>
            <p>{resultCep.bairro}</p>
            <p>{resultCep.logradouro}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default Cep;
