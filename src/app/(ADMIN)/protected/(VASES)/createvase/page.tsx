"use client";

import {
  Alert,
  Button,
  Card,
  CardContent,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { createVase } from "@/services/Vase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateVase() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePriceChange = (e: any) => {
    let value = e.target.value;

    // Remove caracteres não numéricos
    value = value.replace(/\D/g, "");

    // Formata como número com separadores de milhares e decimais, sem o símbolo da moeda
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);

    setPrice(formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    if (!image) {
      setError(true);
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      formData.append("price", price);
      formData.append("description", description);

      await createVase({ name, image, price, description });
      setSuccess(true);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
      router.push("/protected/allvases");
    }
  };

  return (
    <section className="pt-10 pb-20 bg-green-50">
      <div className="flex justify-center pt-10">
        <Card
          style={{
            width: "400px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            borderRadius: "12px",
            padding: "1rem 0",
            margin: "0 0.5rem",
          }}
        >
          <CardContent>
            <Typography
              style={{ marginBottom: "1rem" }}
              variant="h5"
              component="h1"
              align="center"
              gutterBottom
            >
              Criar Vaso
            </Typography>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <TextField
                required
                id="outlined"
                label="Nome do Vaso"
                type="text"
                color="success"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                required
                type="file"
                color="success"
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  if (target.files && target.files[0]) {
                    setImage(target.files[0]);
                  }
                }}
              />

              <TextField
                required
                id="outlined-textarea"
                label="Descrição do Vaso"
                color="success"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
                multiline
              />

              <FormControl>
                <InputLabel htmlFor="outlined-adornment-amount" color="success">
                  Preço
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">R$</InputAdornment>
                  }
                  label="Preço"
                  value={price || ""}
                  onChange={handlePriceChange}
                  color="success"
                />
              </FormControl>

              <Button type="submit" color="success" variant="outlined">
                {!loading && <span>Criar</span>}
                {loading && <span>Aguarde...</span>}
              </Button>

              <Link href="/protected/allvases">
                <Button type="submit" variant="outlined" color="success">
                  Voltar
                </Button>
              </Link>

              {success && (
                <Alert severity="success">Vaso criado com sucesso.</Alert>
              )}
              {error && (
                <Alert severity="error">
                  Erro ao criar vaso, tente novamente mais tarde.
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
