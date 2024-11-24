import Image from "next/image";
import Header from "../components/Header";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import ProductView from "../components/ProductView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import BlackFriday from "../components/BlackFriday";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  return (
    <div>
      <BlackFriday />

      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
        <ProductView products={products} categories={categories} />
      </div>
    </div>
  );
}
