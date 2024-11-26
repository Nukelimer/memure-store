import { ProductType } from "@/sanity.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
export interface BasketItem {
  product: ProductType;
  quantity: number;
}

interface BasketState {
  items: BasketItem[];
  addItem: (product: ProductType) => void;
  removeItem: (productId: string) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => BasketItem[];
}

const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
              return {}
          }
        }),
    }),
    { name: "basket-store" }
  )
);
