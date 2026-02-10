import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  _id: string;
  name: string;
  imageUrl: string;
  price: string;
  quantity: number;
};

type ProductStore = {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (_id: string) => void;
  incrementQuantity: (_id: string) => void;
  decrementQuantity: (_id: string) => void;
  calculateTotal: () => number;
};

// Criando o Store com persistência automática
export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],

      addProduct: (product) =>
        set((state) => {
          const existingProduct = state.products.find(
            (p) => p._id === product._id
          );
          let updatedProducts;
          if (existingProduct) {
            updatedProducts = state.products.map((p) =>
              p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
            );
          } else {
            // Salvando apenas as propriedades essenciais para reduzir o tamanho
            updatedProducts = [
              ...state.products,
              {
                _id: product._id,
                name: product.name,
                imageUrl: product.imageUrl,
                price: product.price,
                quantity: 1,
              },
            ];
          }
          return { products: updatedProducts };
        }),

      removeProduct: (_id) =>
        set((state) => ({
          products: state.products.filter((product) => product._id !== _id),
        })),

      incrementQuantity: (_id) =>
        set((state) => ({
          products: state.products.map((p) =>
            p._id === _id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        })),

      decrementQuantity: (_id) =>
        set((state) => ({
          products: state.products.map((p) =>
            p._id === _id && p.quantity > 1
              ? { ...p, quantity: p.quantity - 1 }
              : p
          ),
        })),

      calculateTotal: () => {
        const products = get().products;
        return products.reduce((total, product) => {
          const price = parseFloat(product.price);
          return total + price * product.quantity;
        }, 0);
      },
    }),
    {
      name: "products-storage", // Nome da chave onde os dados são salvos no localStorage
      // Partialize os dados para armazenar apenas as propriedades essenciais
      partialize: (state) => ({
        products: state.products.map(
          ({ _id, name, imageUrl, price, quantity }) => ({
            _id,
            name,
            imageUrl,
            price,
            quantity,
          })
        ),
      }),
    }
  )
);
