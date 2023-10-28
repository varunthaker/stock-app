import Layout from "@/components/layout/Layout";
import Product from "@/components/product/product";
import useSWR from "swr";
import { ProductType } from "@/db/model/Product";
import { useState } from "react";
import Link from "next/link";
import ProductNotFound from "@/components/product/productnotfound";
import classes from "@/styles/ProductPage.module.css";

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
      <div className={classes.products_page}>
        <h1 className={classes.page_header}>Products</h1>
        <div className={classes.search_container}>
          <input
            className={classes.input}
            type="text"
            placeholder="🔎    Search "
            onChange={(event) => handleInputChange(event)}
          ></input>
        </div>
        <>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: ProductType) => {
              return (
                <div key={product._id}>
                  <Product
                    product={product}
                    closeModal={closeModal}
                    deleteProduct={deleteProduct}
                  />
                </div>
              );
            })
          ) : (
            <ProductNotFound searchQuery={userSearchInput} />
          )}
        </>
        <button type="button" className={classes.create_button}>
          <Link href="/products/create" className={classes.create_link}>
            Create
          </Link>
        </button>
      </div>
      <Layout />
    </>
  );
}
