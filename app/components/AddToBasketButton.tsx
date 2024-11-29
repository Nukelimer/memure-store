"use client";

import { ProductType } from "@/sanity.types";
import { useBasketStore } from "@/store/store";
import React, { useEffect, useState } from "react";
interface AddToBasketButtonProps {
  product: ProductType;
  disabled: boolean;
}
export default function AddToBasketButton({
  product,
  disabled,
}: AddToBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
<div className="flex items-center justify-center">
  <button
    onClick={() => removeItem(product._id)}
    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500 pb-1 ${
      itemCount === 0
        ? "bg-gray-100 cursor-not-allowed"
        : "bg-gray-200 hover:bg-gray-300"
    }`}
    disabled={itemCount === 0 || disabled}>
    <span
      className={`text-xl font-mono leading-none ${
        itemCount === 0 ? "text-gray-400" : "text-gray-600"
      }`}>
      -
    </span>
  </button>
  <span className="w-8 text-center font-semibold">{itemCount}</span>
  <button
    onClick={() => addItem(product)}
    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500 pb-1 ${
      disabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
    }`}
    disabled={disabled}>
    <span className="text-xl font-mono leading-none text-white">
      +
    </span>
  </button>
</div>

  );
}
