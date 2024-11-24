import { Category, ProductType } from "@/sanity.types";
import React from "react";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "@/components/ui/category-selector";

interface ProductViewProps {
  products: ProductType[];
  categories: Category[];
}
export default function ProductView({
  products,
  categories,
}: ProductViewProps) {
  return (
    <div className=" flex flex-col">
      <div className="w-full sm:w-[200px] z-50">
        <CategorySelectorComponent categories={categories} />
      </div>

      <div className="flex-1">
        <ProductGrid products={products} />

        <hr className="w-1/2 sm:w-3/4" />
      </div>
    </div>
  );
}
