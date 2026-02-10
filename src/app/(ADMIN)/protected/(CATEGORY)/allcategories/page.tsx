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

import { deleteCategory } from "@/services/Category";
import Link from "next/link";

import { useState, useEffect } from "react";
import { getCategories } from "@/services/Category";
import { DialogContent, DialogContentText } from "@mui/material";

interface Category {
  _id: string;
  name: string;
}

export default function AllCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllCategories() {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchAllCategories();
  }, []);

  const [open, setOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  const handleClickOpen = (categoryId: string) => {
    setCategoryToDelete(categoryId);
    setOpen(true);
  };

  const handleClose = () => {
    setCategoryToDelete(null);
    setOpen(false);
  };

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;
    try {
      await deleteCategory(categoryToDelete);
      setCategories((prevData) =>
        prevData.filter((item) => item._id !== categoryToDelete)
      );
    } catch (error) {
      console.error(error);
    } finally {
      handleClose();
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
    return <p>Erro ao carregar as categorias</p>;
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
                <TableCell>Nome da Categoria</TableCell>

                <TableCell>
                  <Link href="/protected/createcategory">
                    <Button color="success">Criar Nova Categoria</Button>
                  </Link>
                </TableCell>

                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((category) => (
                  <TableRow key={category._id}>
                    <TableCell component="th" scope="row">
                      <span className="break-all">{category.name}</span>
                    </TableCell>

                    <TableCell align="right">
                      <Link href={`/protected/editcategory/${category._id}`}>
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
                          onClick={() => handleClickOpen(category._id)}
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
              Tem certeza que deseja apagar esta categoria?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button style={{ color: "#000" }} autoFocus onClick={handleClose}>
              Cancelar
            </Button>
            <Button color="error" onClick={handleDeleteCategory}>
              Apagar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </section>
  );
}
