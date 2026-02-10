"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import { getPlants } from "@/services/Plant";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import Link from "next/link";

interface Plant {
  _id: string;
  name: string;
  imageUrl: string;
  price: string;
  newPrice: string;
}

export default function CarroselInDetail() {
  const [plants, setPlants] = useState<Plant | any>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const plantsData = await getPlants();
        setPlants(plantsData);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
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
    return (
      <div className="flex items-center justify-center bg-red-50 h-screen">
        <p className="text-red-600 font-semibold text-xl">
          Ocorreu um erro ao carregar a planta. Tente novamente mais tarde.
        </p>
      </div>
    );
  }

  return (
    <section className="flex flex-col justify-center mt-10 p-4">
      <h2 className="text-2xl uppercase tracking-widest underline underline-offset-8 text-green-900 text-center my-6">
        Outros Modelos
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        spaceBetween={-30}
        autoplay={{ delay: 3000 }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-[300px] sm:w-[600px] lg:w-[800px]"
      >
        {plants.map((plant: any, index: any) => (
          <SwiperSlide
            key={`${plant._id}-${index}`}
            className="flex justify-center items-center px-20 md:px-14 mb-4"
          >
            <Card
              sx={{ maxWidth: 200 }}
              key={plant._id}
              className="shadow-md shadow-gray-400 hover:scale-105 mt-4 transition"
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={plant.imageUrl}
                  alt={plant.name}
                  style={{ height: "150px", width: "200px" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="body2" component="div">
                    {plant.name}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                  >
                    R$ {plant.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
              
              <div className="p-2 -mt-4">
                <Button variant="contained" color="success" fullWidth>
                  <Link href={`/plantdetail/${plant._id}`} passHref>
                    Comprar
                  </Link>
                </Button>
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
