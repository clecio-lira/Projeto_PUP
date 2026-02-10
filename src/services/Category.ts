import dotenv from "dotenv";
dotenv.config();
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const URL = `${API_URL}/categories`;

export async function createCategory({
  name,
  image,
}: {
  name: string;
  image: File;
}) {
  const token = Cookies.get("nextauth.token");
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);

  const res = await fetch(URL!, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res.json();
}

export async function getCategories() {
  const res = await fetch(URL, {
    method: "GET",
  });

  return res.json();
}

export async function getCategory(id: string) {
  const res = await fetch(`${URL!}/${id}`, {
    method: "GET",
  });

  return res.json();
}

export async function updateCategory({
  id,
  name,
  image,
}: {
  id: string;
  name: string;
  image: File;
}) {
  const token = Cookies.get("nextauth.token");
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);

  const res = await fetch(`${URL!}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res.json();
}

export async function deleteCategory(id: string) {
  const token = Cookies.get("nextauth.token");
  const res = await fetch(`${URL!}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
