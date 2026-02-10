import dotenv from "dotenv";
dotenv.config();
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const URL = `${API_URL}/vases`;

export async function createVase({
  name,
  image,
  price,
  description,
}: {
  name: string;
  image: File;
  price: string;
  description: string;
}) {
  const token = Cookies.get("nextauth.token");
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);
  formData.append("price", price);
  formData.append("description", description);

  const res = await fetch(URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res.json();
}

export async function getVases() {
  const res = await fetch(URL, {
    method: "GET",
  });

  return res.json();
}

export async function getVase(id: string) {
  const res = await fetch(`${URL}/${id}`, {
    method: "GET",
  });

  return res.json();
}

export async function updateVase({
  id,
  name,
  image,
  price,
  description,
}: {
  id: string;
  name: string;
  image: File;
  price: string;
  description: string;
}) {
  const token = Cookies.get("nextauth.token");
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);
  formData.append("price", price);
  formData.append("description", description);

  const res = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res.json();
}

export async function deleteVase(id: string) {
  const token = Cookies.get("nextauth.token");
  const res = await fetch(`${URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
