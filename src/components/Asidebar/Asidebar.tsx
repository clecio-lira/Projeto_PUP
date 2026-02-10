"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosRemoveCircle } from "react-icons/io";
import { IoMdCart } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useProductStore } from "@/store/cart";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import Link from "next/link";

const Asidebar = () => {
  const [open, setOpen] = useState(false);
  const { products, removeProduct, incrementQuantity, decrementQuantity } =
    useProductStore();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250, color: "green" }} role="presentation">
      <List>
        <ListItem
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            paddingBottom: "3rem",
          }}
        >
          <div>
            <div className="flex items-center justify-between">
              <p className="uppercase tracking-widest">Carrinho</p>

              <button onClick={toggleDrawer(false)}>
                <IoMdClose size={"24px"} color="gray" />
              </button>
            </div>

            {products.map((product) => (
              <Card
                key={product._id}
                sx={{ maxWidth: 200 }}
                className="rounded-md shadow-md shadow-gray-500 p-2 mt-4 mb-4"
              >
                <CardMedia
                  component="img"
                  image={product.imageUrl}
                  alt={product.name}
                  style={{ height: 150, width: 200 }}
                  className="rounded-md"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    fontWeight="600"
                    variant="body2"
                    component="div"
                  >
                    <span>{product.name}</span>
                  </Typography>

                  <Typography gutterBottom variant="body2" component="div">
                    R$ {product.price}
                  </Typography>
                </CardContent>

                <div>
                  <div className="flex justify-between w-full items-center px-4 -mt-4">
                    <button
                      onClick={() => {
                        incrementQuantity(product._id);
                      }}
                    >
                      <IoIosAddCircle size="24px" color="green" />
                    </button>

                    <p>{product.quantity}</p>

                    <button onClick={() => decrementQuantity(product._id)}>
                      <IoIosRemoveCircle size="24px" color="red" />
                    </button>
                  </div>
                  <Button
                    variant="contained"
                    color="error"
                    size="medium"
                    style={{ width: "100%", marginTop: "0.5rem" }}
                    onClick={() => removeProduct(product._id)}
                  >
                    Remover
                  </Button>
                </div>
              </Card>
            ))}

            <Button
              variant="contained"
              color="success"
              className="w-full text-center mt-4"
              onClick={toggleDrawer(false)}
            >
              <Link href={"/bag"}>Finalizar Compra</Link>
            </Button>
          </div>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="fixed right-10 rounded-full bottom-10 z-50 flex items-center justify-center text-white bg-gradient-to-r from-green-500 to-green-900 h-16 w-16 sm:h-20 sm:w-20 shadow-md shadow-gray-500 transition hover:scale-105">
      <Button onClick={toggleDrawer(true)} style={{ color: "#fff" }}>
        <IoMdCart size={"24px"} /> <span>{products.length}</span>
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default Asidebar;
