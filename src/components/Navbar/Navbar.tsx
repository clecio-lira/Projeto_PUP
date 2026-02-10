import { Button } from "@mui/material";
import Link from "next/link";
import DrawerNavbar from "./Drawer";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 text-white bg-gradient-to-r from-green-500 to-green-900">
      <Link href="/" className="text-xl font-bold hover:text-green-900 transition">
        <span>Plante uma Planta</span>
      </Link>

      <div className="hidden md:flex md:items-center gap-4">
        <Link href="/" className="hover:text-green-500 transition">
          Início
        </Link>

        <Link href="/about" className="hover:text-green-500 transition">
          Sobre
        </Link>

        <Link href="/contacts" className="hover:text-green-500 transition">
          Contatos
        </Link>
      </div>

      <div className="hidden space-x-4 md:flex items-center">
        <Link
          href="/register"
          className="hover:bg-green-500 transition rounded-md"
        >
          <Button>
            <span className="text-white">Cadastrar</span>
          </Button>
        </Link>

        <Link
          href="/login"
          className="hover:bg-green-500 transition rounded-md"
        >
          <Button>
            <span className="text-white">Entrar</span>
          </Button>
        </Link>
      </div>

      <div className="md:hidden mt-2">
        <DrawerNavbar/>
      </div>
    </nav>
  );
}
