"use client";
import { useProductStore } from "@/store/cart";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import Cep from "@/components/Cep/Cep";
import CreditCard from "@/components/CreditCard/CreditCard";

const Bag = () => {
  const {
    products,
    removeProduct,
    incrementQuantity,
    decrementQuantity,
    calculateTotal,
  } = useProductStore();

  return (
    <main className="flex flex-col xl:flex-row items-center justify-center gap-4 xl:items-start bg-white pt-10 pb-40">
      <section className="flex flex-col justify-center items-center lg:w-4/5 xl:w-1/2 border-b border-b-gray-300">
        <TableContainer sx={{ maxWidth: 800 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Produto</TableCell>
                <TableCell align="center">Quantidade</TableCell>
                <TableCell align="center">Preço</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <div className="flex gap-4 flex-col sm:flex-row">
                      <img
                        src={`${product.imageUrl}`}
                        alt={`${product.name}`}
                        width={200}
                        height={200}
                        className="rounded-md"
                      />
                      <div className="flex flex-col justify-center text-center">
                        {product.name}
                        <Button
                          variant="text"
                          color="error"
                          onClick={() => removeProduct(product._id)}
                        >
                          <span className="underline">Remover</span>
                        </Button>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col sm:flex-row items-center">
                      <Button onClick={() => incrementQuantity(product._id)}>
                        <IoIosAddCircle size={"24px"} color="green" />
                      </Button>

                      {product.quantity}

                      <Button onClick={() => decrementQuantity(product._id)}>
                        <IoIosRemoveCircle size={"24px"} color="red" />
                      </Button>
                    </div>
                  </TableCell>

                  <TableCell align="center">
                    <strong>R${product.price}</strong>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      <section className="flex flex-col justify-between gap-4">
        <div>
          <Cep />
        </div>

        <div>
          <CreditCard />
        </div>

        <div className="text-black mt-3 text-end">
          <p className="mb-2">
            Valor total: <strong>R${calculateTotal().toFixed(2)}</strong>
          </p>

          <Button variant="outlined" color="success" className="text-center">
            Comprar
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Bag;
