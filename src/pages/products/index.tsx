import Layout from "@/components/layout/Layout";
import Product from "@/components/product/product";
import useSWR from "swr";
import { ProductType } from "../../../db/model/Product";
import { useState } from "react";
import Link from "next/link";
import ProductNotFound from "@/components/product/productnotfound";

interface ProductPageProps {
  closeModal: () => void;
  deleteProduct: () => void;
}

export default function ProductPage({
  closeModal,
  deleteProduct,
}: ProductPageProps) {
  const [userSearchInput, setUserSearchInput] = useState("");
  const {
    mutate,
    data: products,
    error,
    isLoading,
  } = useSWR("/api/products", { fallbackData: [] });
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // console.log("Products are", products);
  const filteredProducts = products.filter((product: ProductType) => {
    return product.name.toLowerCase().includes(userSearchInput.toLowerCase());
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserSearchInput(event.target.value);
  }

  return (
    <>
      <h1>Products</h1>
      <div>
        <input
          type="text"
          placeholder="Search products"
          onChange={(event) => handleInputChange(event)}
        ></input>
      </div>
      <ul>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: ProductType) => {
            return (
              <li key={product._id}>
                <Product
                  product={product}
                  closeModal={closeModal}
                  deleteProduct={deleteProduct}
                />
              </li>
            );
          })
        ) : (
          <ProductNotFound searchQuery={userSearchInput} />
        )}
      </ul>
      <Link href="/products/create">Create</Link>
      <Layout />
    </>
  );
}
