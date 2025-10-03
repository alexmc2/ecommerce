// sanity/queries/product/all-products.ts
import { groq } from "next-sanity";
import { imageQuery } from "../shared/image";

export const productCardFields = `
  _id,
  title,
  slug,
  price,
  compareAtPrice,
  excerpt,
  images[]{
    ${imageQuery}
  }
`;

export const PRODUCTS_QUERY = groq`
  *[_type == "product" && defined(slug.current)] | order(orderRank asc) {
    ${productCardFields}
  }
`;

export const PRODUCTS_BY_IDS_QUERY = groq`
  *[_type == "product" && _id in $ids] | order(orderRank asc) {
    ${productCardFields}
  }
`;

export const COLLECTION_PRODUCTS_QUERY = groq`
  *[_type == "collection" && _id == $collectionId][0]{
    products[]->{
      ${productCardFields}
    }
  }
`;
