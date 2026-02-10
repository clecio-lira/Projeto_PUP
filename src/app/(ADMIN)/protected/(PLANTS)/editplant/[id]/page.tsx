"use client";

import {
  Alert,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { updatePlant, getPlant } from "@/services/Plant";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import SelectCategory from "@/components/SelectCategory/SelectCategory";

export default function EditPlant() {
  const router = useRouter();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [image, setImage] = useState<File>();
  const [price, setPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [bestSelling, setBestSelling] = useState(false);
  const [trend, setTrend] = useState(false);
  const [preview, setPreview] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePriceChange = (e: any) => {
    let value = e.target.value;

    value = value.replace(/\D/g, "");

    const formattedValue = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);

    setPrice(formattedValue);
  };

  const handleNewPriceChange = (e: any) => {
    let value = e.target.value;

    value = value.replace(/\D/g, "");

    const formattedValue = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);

    setNewPrice(formattedValue);
  };

  useEffect(() => {
    const fetchPlant = async () => {
      if (typeof id === "string") {
        try {
          const plant = await getPlant(id);
          setName(plant.name);
          setPreview(plant.image);
          setPrice(plant.price);
          setNewPrice(plant.newPrice);
          setDescription(plant.description);
          setCategory(plant.category);
          setBestSelling(plant.bestSelling);
          setTrend(plant.trend);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchPlant();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    if (typeof id === "string") {
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        if (image) {
          formData.append("image", image);
        }
        formData.append("price", price);
        formData.append("newPrice", newPrice);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("bestSelling", bestSelling.toString());
        formData.append("trend", trend.toString());

        if (image) {
          await updatePlant({
            id,
            name,
            image,
            price,
            newPrice,
            description,
            category,
            bestSelling,
            trend,
          });
        }
        setSuccess(true);
        router.push("/protected/allplants");
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
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
              Editar Planta
            </Typography>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <TextField
                required
                id="outlined"
                label="Nome da Planta"
                type="text"
                color="success"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />

              {preview && (
                <img
                  src={preview}
                  alt="Preview da imagem atual"
                  style={{
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}

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
                label="Descrição da Planta"
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

              <FormControl>
                <InputLabel htmlFor="outlined-adornment-amount" color="success">
                  Preço Promocional
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">R$</InputAdornment>
                  }
                  label="Preço Promocional"
                  value={newPrice || ""}
                  onChange={handleNewPriceChange}
                  color="success"
                />
              </FormControl>

              <SelectCategory
                selectedCategory={category || ""}
                onSelectCategory={(value) => setCategory(value)}
              />

              <div className="flex justify-around">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="success"
                      value={bestSelling || ""}
                      onChange={(e) => setBestSelling(e.target.checked)}
                    />
                  }
                  label="Mais Vendidos"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      color="success"
                      value={trend || ""}
                      onChange={(e) => setTrend(e.target.checked)}
                    />
                  }
                  label="Trend"
                />
              </div>

              <Button type="submit" color="success" variant="outlined">
                {!loading && <span>Editar</span>}
                {loading && <span>Aguarde...</span>}
              </Button>

              <Link href="/protected/allplants">
                <Button type="submit" variant="outlined" color="success">
                  Voltar
                </Button>
              </Link>

              {success && (
                <Alert severity="success">Planta editada com sucesso.</Alert>
              )}
              {error && (
                <Alert severity="error">
                  Erro ao editar planta, tente novamente mais tarde.
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
