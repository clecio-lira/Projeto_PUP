"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { getCategories } from "@/services/Category";
import { Box, Button, CircularProgress } from "@mui/material";
import Link from "next/link";

interface Category {
  _id: string;
  name: string;
  imageUrl: string;
}

const CategoriesCarousel = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCategory = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
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
          Ocorreu um erro ao carregar as categorias. Tente novamente mais tarde.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full mx-auto md:w-10/12 lg:w-10/12 xl:w-8/12 2xl:w-6/12">
      <h2 className="text-2xl uppercase tracking-widest underline underline-offset-8 text-green-900 text-center my-6">
        Categorias
      </h2>
      <div className="flex justify-center">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          spaceBetween={-30}
          autoplay={{ delay: 3000 }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {categories.map((category, index) => (
            <SwiperSlide
              key={`${category._id}-${index}`}
              className="flex justify-center items-center px-20 md:px-14 mb-4"
            >
              <div className="rounded-lg shadow-md shadow-gray-500 overflow-hidden p-2 bg-white">
                <img
                  src={category.imageUrl}
                  alt={`Categoria ${category.name}`}
                  className="w-full h-40 object-cover rounded-md"
                />

                <Button
                  variant="contained"
                  color="success"
                  style={{ width: "100%", marginTop: "0.5rem" }}
                >
                  <Link
                    href={`/products/${category._id}`}
                    className="flex justify-center w-full"
                  >
                    {category.name}
                  </Link>
                </Button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategoriesCarousel;
