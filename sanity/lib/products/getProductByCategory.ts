import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductByCategory = async (slug: string) => {
  const PRODUCT_BY_CATEGORY_QUERY = defineQuery(`*[
  
  
          _type == 'productType' && references(*[_type == 'category' && slug.current == $slug]._id)] | order(name asc)`);

  try {
    const products = await sanityFetch({
      query: PRODUCT_BY_CATEGORY_QUERY,
      params: { slug },
    });

    return products.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
