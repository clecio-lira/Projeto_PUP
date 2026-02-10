import { TextField } from "@mui/material";
import React from "react";

const Contacts = () => {
  return (
    <section className="bg-green-50 text-green-900 font-sans">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          🌿 Entre em Contato Conosco
        </h1>

        <p className="mb-6">
          Tem alguma dúvida, sugestão ou precisa de ajuda? Nossa equipe está
          pronta para conversar e ajudar você a encontrar as plantas e
          acessórios ideais para o seu ambiente.
        </p>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form action="#" method="POST" className="space-y-4">
            <div>
              <TextField
                required
                label="Nome"
                type="text"
                color="success"
                className="w-full"
              />
            </div>

            <div>
              <TextField
                required
                label="E-mail"
                type="text"
                color="success"
                className="w-full"
              />
            </div>

            <div>
              <TextField
                required
                label="Mensagem"
                type="text"
                multiline
                rows={4}
                color="success"
                className="w-full"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            📍 Nossa Loja
          </h2>
          <p>
            Endereço: Rua das Plantas, 123 - Bairro Verde, Cidade das Flores
          </p>
          <p>Telefone: (11) 1234-5678</p>
          <p>E-mail: contato@lojadeplantas.com.br</p>
          <p>Horário de atendimento: Segunda a sexta, das 9h às 18h</p>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
