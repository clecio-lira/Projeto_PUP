"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: any) => {
    e.preventDefault();
  };

  return (
    <main className="h-screen bg-green-50">
      <div className="flex justify-center pt-10">
        <Card
          style={{
            width: "400px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            borderRadius: "12px",
            padding: "1rem 0",
            margin: "0 0.5rem"
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h1" align="center" gutterBottom>
              Criar conta
            </Typography>

            <form
              onSubmit={handleRegister}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <TextField
                label="Nome"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
                color="success"
              />
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                color="success"
              />
              <TextField
                label="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                color="success"
              />
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
              >
                Entrar
              </Button>
            </form>

            <Typography variant="body2" component="h6" align="center" gutterBottom style={{margin:"1rem 0 0"}}>
              Já tem uma conta? <Link href="/login" className="hover:text-green-500 underline">Entre</Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default RegisterPage;
