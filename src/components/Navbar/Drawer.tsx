"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";

export default function DrawerNavbar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250, color: 'green' }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '3rem'}}>
          <ListItemText><Link href="/">Início</Link></ListItemText>
          <ListItemText><Link href="/about">Sobre</Link></ListItemText>
          <ListItemText><Link href="/contacts">Contatos</Link></ListItemText>
          <ListItemButton><Link href="/register">Cadastrar</Link></ListItemButton>
          <ListItemButton><Link href="/login">Entrar</Link></ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)} style={{ color: "#fff" }}>
        Menu
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
