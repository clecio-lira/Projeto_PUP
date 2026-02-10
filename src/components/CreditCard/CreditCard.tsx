"use client";
import { TextField } from "@mui/material";
import { useState } from "react";

const CreditCard = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardFlag, setCardFlag] = useState<string>("");

  const validarCartaoCredito = (numeroCartao: string): string => {
    numeroCartao = numeroCartao.replace(/\s+/g, "");

    const bandeiras: { [key: string]: RegExp } = {
      Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      MasterCard: /^5[1-5][0-9]{14}$/,
      AmericanExpress: /^3[47][0-9]{13}$/,
      DinersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
      Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      EnRoute: /^(2014|2149)\d{11}$/,
      JCB: /^(?:2131|1800|35\d{3})\d{11}$/,
      Voyager: /^8699[0-9]{11}$/,
      HiperCard: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
      Aura: /^50[0-9]{14,17}$/,
    };

    for (let bandeira in bandeiras) {
      if (bandeiras[bandeira].test(numeroCartao)) {
        return bandeira;
      }
    }

    return "Bandeira desconhecida";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCardNumber(value);

    // Identifica a bandeira do cartão
    const flag = validarCartaoCredito(value);
    setCardFlag(flag);
  };

  return (
    <div>
      <div className="mt-4 flex gap-2">
        <TextField
          label="Cartão de Crédito"
          type="text"
          value={cardNumber}
          onChange={handleChange}
          fullWidth
          required
          color="success"
        />
      </div>
      {cardFlag && (
        <p className="mt-2 text-green-600 font-semibold">Bandeira: {cardFlag}</p>
      )}
    </div>
  );
};

export default CreditCard;
