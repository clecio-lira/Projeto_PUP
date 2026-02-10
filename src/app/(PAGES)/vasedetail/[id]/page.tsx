"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getVase } from "@/services/Vase";
import { Box, Button, CircularProgress } from "@mui/material";
import CarroselInDetail from "@/components/Carrosel/CarroselInDetail";
import Cep from "@/components/Cep/Cep";
import { useProductStore } from "@/store/cart";

interface Vase {
  _id: string;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
}

export default function VaseDetail() {
  const { id } = useParams();
  const [vase, setVase] = useState<Vase | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { addProduct } = useProductStore();

  useEffect(() => {
    const fetchVase = async () => {
      try {
        if (typeof id === "string") {
          const vaseData = await getVase(id);
          setVase(vaseData);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVase();
  }, [id]);

  const handleAddProduct = (e: any) => {
    e.preventDefault();

    if (vase) {
      addProduct({
        ...vase, quantity: 1,
        _id: vase._id,
        imageUrl: vase.imageUrl,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-green-50 h-screen">
        <Box sx={{ display: "flex" }}>
          <CircularProgress size="5rem" color="success" />
        </Box>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center bg-red-50 h-screen">
        <p className="text-red-600 font-semibold text-xl">
          Ocorreu um erro ao carregar o vaso. Tente novamente mais tarde.
        </p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <section className="flex flex-col justify-center p-4 my-4 items-center lg:w-4/5 xl:w-1/2">
        <div className="flex flex-col md:flex-row justify-center md:gap-4 w-4/5">
          <div className="flex-1">
            <img
              src={`${vase?.imageUrl}`}
              alt={`${vase?.name}`}
              className="rounded-md shadow-md shadow-gray-500"
            />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-2xl mb-2">{vase?.name}</h2>

            <p>R$ {vase?.price}</p>

            <p>{vase?.description}</p>

            <div>
              <Cep />
            </div>

            <Button
              variant="contained"
              color="success"
              style={{ marginTop: "1rem" }}
              fullWidth
              onClick={handleAddProduct}
            >
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>

        <div>
          <CarroselInDetail />
        </div>
      </section>
    </main>
  );
}
