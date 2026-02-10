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
import { getVases } from "@/services/Vase";
import { deleteVase } from "@/services/Vase";
import { DialogContent, DialogContentText } from "@mui/material";

interface Vase {
  _id: string;
  name: string;
}

export default function AllVases() {
  const [vases, setVases] = useState<Vase[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllVases() {
      try {
        const vasesData = await getVases();
        setVases(vasesData);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchAllVases();
  }, []);

  const [open, setOpen] = useState(false);
  const [vaseToDelete, setVaseToDelete] = useState<string | null>(null);

  const handleClickOpen = (vaseId: string) => {
    setVaseToDelete(vaseId);
    setOpen(true);
  };

  const handleClose = () => {
    setVaseToDelete(null);
    setOpen(false);
  };

  const handleDeleteVase = async () => {
    if (!vaseToDelete) return;
    try {
      await deleteVase(vaseToDelete);
      setVases((prevData) =>
        prevData.filter((item) => item._id !== vaseToDelete)
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
    return <p>Erro ao carregar os vasos</p>;
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
                <TableCell>Nome do Vaso</TableCell>

                <TableCell>
                  <Link href="/protected/createvase">
                    <Button color="success">Criar Novo Vaso</Button>
                  </Link>
                </TableCell>

                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vases
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((vase) => (
                  <TableRow key={vase._id}>
                    <TableCell component="th" scope="row">
                      <span>{vase.name}</span>
                    </TableCell>

                    <TableCell align="right">
                      <Link href={`/protected/editvase/${vase._id}`}>
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
                          onClick={() => handleClickOpen(vase._id)}
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
              Tem certeza que deseja apagar este vaso?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button style={{ color: "#000" }} autoFocus onClick={handleClose}>
              Cancelar
            </Button>
            <Button color="error" onClick={handleDeleteVase}>
              Apagar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </section>
  );
}
