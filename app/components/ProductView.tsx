import { Category, ProductType } from "@/sanity.types";
import React from "react";
import ProductGrid from "./ProductGrid";

interface ProductViewProps {
    products: ProductType[];
    // categories: Category[]
}
export default function ProductView({ products }: ProductViewProps) {
  return (
    <div className=" flex flex-col">
      <div className="w-full sm:w-[200px]">
        {/* <CategorySelectorComponent categories={categories} /> */}
      </div>

      <div className="flex-1">
        <div className="">
          <ProductGrid products={products} />

          <hr className="w-1/2 sm:w-3/4" />
        </div>
      </div>
    </div>
  );
}
