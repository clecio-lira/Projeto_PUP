"use client";

import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getPlants } from "@/services/Plant";
import { getCategories } from "@/services/Category";
import { deletePlant } from "@/services/Plant";
import { DialogContent, DialogContentText } from "@mui/material";

interface Plants {
  _id: string;
  name: string;
  price: string;
  category: string;
}

interface Category {
  _id: string;
  name: string;
}

export default function AllPlants() {
  const [plants, setPlants] = useState<Plants[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchAllPlants() {
    try {
      const plantsData = await getPlants();
      setPlants(plantsData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchAllPlants();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await getCategories();
        setCategories(categoryData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const filterCategory = (categoryId: string) => {
    return categories.find((category) => category._id === categoryId)?.name;
  };

  const [open, setOpen] = useState(false);
  const [plantToDelete, setPlantToDelete] = useState<string | null>(null); // ID da planta a ser deletada

  const handleClickOpen = (plantId: string) => {
    setPlantToDelete(plantId); // Define a planta para ser apagada
    setOpen(true); // Abre o diálogo
  };

  const handleClose = () => {
    setPlantToDelete(null); // Reseta o estado da planta
    setOpen(false); // Fecha o diálogo
  };

  const handleDeletePlant = async () => {
    if (!plantToDelete) return; // Garante que há uma planta definida para apagar
    try {
      await deletePlant(plantToDelete);
      setPlants((prevData) =>
        prevData.filter((item) => item._id !== plantToDelete)
      );
    } catch (error) {
      console.error(error);
    } finally {
      handleClose(); // Fecha o diálogo
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
    return <p>Erro ao carregar as plantas</p>;
  }

  return (
    <section className="bg-green-50 pb-28">
      <div className="flex justify-center py-10">
        <TableContainer
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Table
            sx={{ maxWidth: 700, padding: "0 1rem" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Nome da Planta</TableCell>
                <TableCell className="hidden md:table-cell">
                  Nome da Categoria
                </TableCell>

                <TableCell>
                  <Link href="/protected/createplant">
                    <Button color="success">Criar Nova Planta</Button>
                  </Link>
                </TableCell>

                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plants
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((plant) => (
                  <TableRow key={plant._id}>
                    <TableCell component="th" scope="row">
                      <span>{plant.name}</span>
                    </TableCell>

                    <TableCell
                      className="hidden md:table-cell"
                      component="th"
                      scope="row"
                    >
                      <span className="break-all">
                        {filterCategory(plant.category)}{" "}
                      </span>
                    </TableCell>

                    <TableCell align="right">
                      <Link href={`/protected/editplant/${plant._id}`}>
                        <Button color="success" variant="contained">
                          <span className="hidden md:block pr-2">Editar</span>
                          <FaRegEdit />
                        </Button>
                      </Link>
                    </TableCell>

                    <TableCell align="right">
                      <React.Fragment>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleClickOpen(plant._id)} // Passa o ID da planta ao abrir o diálogo
                        >
                          <span className="hidden md:block pr-2">Apagar</span>
                          <FaRegTrashCan />
                        </Button>
                      </React.Fragment>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              Tem certeza que deseja apagar esta planta?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button style={{ color: "#000" }} autoFocus onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              color="error"
              onClick={handleDeletePlant} // Agora usa a planta definida no estado
            >
              Apagar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </section>
  );
}
