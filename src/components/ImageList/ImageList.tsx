import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import image1 from "@/assets/images/1.jpeg"
import image2 from "@/assets/images/2.jpeg"
import image3 from "@/assets/images/3.jpeg"
import image5 from "@/assets/images/5.jpeg"
import image6 from "@/assets/images/6.jpeg"
import image7 from "@/assets/images/7.jpeg"
import image8 from "@/assets/images/8.jpeg"
import image9 from "@/assets/images/9.jpeg"
import image10 from "@/assets/images/10.jpeg"
import image11 from "@/assets/images/11.jpeg"
import image12 from "@/assets/images/12.jpeg"
import Image from "next/image";

export default function MasonryImageList() {
  return (
    <section className="flex flex-col p-4 my-8 items-center justify-center">

      <h2 className="text-2xl uppercase tracking-widest underline underline-offset-8 text-green-900 text-center my-6">
        Celebre a vida com quem você ama
      </h2>

      <Box>
        <ImageList variant="masonry" cols={3} gap={8}>
          {itemData.map((item) => (
            <ImageListItem key={item.title}>
              <Image
                src={item.img}
                alt={item.title}
                width={300}
                className="shadow-md shadow-gray-500 object-cover"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </section>
  );
}

const itemData = [
  {
    img: image1,
    title: "1",
  },
  {
    img: image2,
    title: "2",
  },
  {
    img: image3,
    title: "3",
  },
  {
    img: image5,
    title: "5",
  },
  {
    img: image6,
    title: "6",
  },
  {
    img: image7,
    title: "7",
  },
  {
    img: image8,
    title: "8",
  },
  {
    img: image9,
    title: "9",
  },
  {
    img: image10,
    title: "10",
  },
  {
    img: image11,
    title: "11",
  },
  {
    img: image12,
    title: "12",
  },
];
