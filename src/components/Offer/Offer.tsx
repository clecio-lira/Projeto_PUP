"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Button, CardActions } from "@mui/material";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getPlants } from "@/services/Plant";

interface Plant {
  _id: string;
  name: string;
  imageUrl: string;
  price: string;
  newPrice: string;
}

export default function Offer() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllOffer() {
      try {
        const plantsData = await getPlants();
        setPlants(plantsData);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchAllOffer();
  }, []);

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
    return <p>Erro ao carregar as ofertas.</p>;
  }

  return (
    <section className="flex flex-col mt-4 items-center justify-center">
      <h2 className="text-2xl uppercase tracking-widest underline underline-offset-8 text-green-900 text-center my-6">
        Ofertas
      </h2>

      <div className="flex flex-wrap justify-center gap-6 w-full mx-auto md:w-10/12 lg:w-10/12 xl:w-8/12 2xl:w-6/12">
        {plants
          .filter((plant) => plant.newPrice)
          .map((plant) => (
            <Link key={plant._id} href={`/plantdetail/${plant._id}`}>
              <Card
                sx={{ maxWidth: 190 }}
                className="rounded-md shadow-md shadow-gray-500 p-2 hover:scale-105 transition"
              >
                <CardMedia
                  component="img"
                  image={plant.imageUrl}
                  alt={plant.name}
                  style={{ height: 200, width: 200 }}
                  className="rounded-md"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    fontWeight="600"
                    variant="body2"
                    component="div"
                  >
                    <span>{plant.name}</span>
                  </Typography>

                  <Typography gutterBottom variant="body2" component="div" className="line-through text-red-600">
                    R$ {plant.price}
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div">
                    R$ {plant.newPrice}
                  </Typography>

                </CardContent>

                <CardActions>
                  <Button variant="contained" color="success" size="medium" style={{width: "100%", marginTop: "-1rem"}}>
                    Comprar
                  </Button>
                  
                </CardActions>
              </Card>
            </Link>
          ))
          .sort()}
      </div>
    </section>
  );
}
