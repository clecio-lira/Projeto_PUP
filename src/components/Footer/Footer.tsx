import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Typography } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: "white", mt: 1 }}>
      <Link className="hover:underline" href="https://www.linkedin.com/in/cleciolira/" target="_blank">
        Clécio Lira
      </Link>
      {" ©, todos os direitos reservados."}
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <section className="bg-gradient-to-r relative bottom-0 p-4 from-green-500 to-green-900 w-full text-white">
      <h5 className="font-semibold text-2xl pb-8 text-center">
        Plante uma Planta
      </h5>
      <div className="flex justify-around flex-wrap">
        <div>
          <ul className="flex flex-col gap-2">
            <li>
              <p className="font-semibold">Links Rápidos</p>
            </li>

            <li>
              <Link href={"/about"} className="hover:underline">
                Sobre
              </Link>
            </li>
            <li>
              <Link href={"/contacts"} className="hover:underline">
                Contatos
              </Link>
            </li>
            <li>
              <Link href={"/politic"} className="hover:underline">
                Politica de privacidade
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center">
          <FaFacebook
            size={30}
            className="hover:scale-105 transition cursor-pointer"
          />
          <AiFillInstagram
            size={35}
            className="hover:scale-105 transition cursor-pointer"
          />
          <FaSquareXTwitter
            size={30}
            className="hover:scale-105 transition cursor-pointer"
          />
        </div>
      </div>
      <div className="text-center pt-4">
        <Copyright />
      </div>
    </section>
  );
}
