"use client";

import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useState, useEffect } from "react";
import { getCategories } from "@/services/Category";
import { Alert } from "@mui/material";

interface Category {
  _id: string;
  name: string;
}

interface SelectCategoryProps {
  selectedCategory: string;
  onSelectCategory: (value: string) => void;
}

export default function SelectCategory({
  selectedCategory,
  onSelectCategory,
}: SelectCategoryProps) {
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

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    onSelectCategory(value);
  };

  return (
    <FormControl>
      <InputLabel id="select-category-label" color="success">
        Categoria
      </InputLabel>
      <Select
        required
        labelId="select-category-label"
        id="select-category"
        color="success"
        value={selectedCategory}
        onChange={handleChange}
        input={<OutlinedInput label="Categoria" />}
      >
        <MenuItem value="">
          <em>Selecione uma categoria</em>
        </MenuItem>
        {categories.map((category) => (
          <MenuItem key={category._id} value={category._id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>

      {error && <Alert severity="error">Categoria Inválida.</Alert>}
    </FormControl>
  );
}
