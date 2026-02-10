"use client";

import {
  Alert,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { updateCategory, getCategory } from "@/services/Category";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

export default function EditCategory() {
  const router = useRouter();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      if (typeof id === "string") {
        try {
          const category = await getCategory(id);
          setName(category.name);
          setPreview(category.imageUrl);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchCategory();
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

        if (image) {
          await updateCategory({ id, name, image });
          setSuccess(true);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
        router.push("/protected/allcategories");
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
              Editar Categoria
            </Typography>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <TextField
                required
                label="Nome da Categoria"
                type="text"
                color="success"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {/* Preview da imagem atual */}
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

              <Button type="submit" color="success" variant="outlined">
                {!loading ? "Editar" : "Aguarde..."}
              </Button>

              <Link href="/protected/allcategories">
                <Button variant="outlined" color="success">
                  Voltar
                </Button>
              </Link>

              {success && (
                <Alert severity="success">Categoria editada com sucesso.</Alert>
              )}
              {error && (
                <Alert severity="error">
                  Erro ao editar categoria, tente novamente mais tarde.
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
