import Layout from "@/components/layout/Layout";
import Button from "@/components/product/button/productbutton";
// import ProductSearchForm from "@/components/product/form";
import Product from "@/components/product/product";
import useSWR from "swr";
import { ProductType } from "../../../db/model/Product";
import { useState } from "react";

export default function ProductPage() {
  const [input, setInput] = useState("");
  const {
    data: products,
    error,
    isLoading,
  } = useSWR("/api/products", { fallbackData: [] });
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  console.log(products);

  function handleCreate() {
    console.log("Create Button Clicked");
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
  }

  function handleSearchSubmit() {
    console.log("Clicked on Handle Search");
  }

  return (
    <>
      <h1>Products</h1>
      <div>
        <input
          type="text"
          placeholder="Search products"
          onChange={() => handleInputChange(event)}
          // value={}
        ></input>
        <button type="button" onClick={handleSearchSubmit}>
          🔎
        </button>
      </div>
      <ul>
        {products.map((product: ProductType) => {
          return (
            <li key={product._id}>
              <Product product={product} />
            </li>
          );
        })}
      </ul>
      <Button text={"Create"} handleClick={handleCreate} />
      <Layout />
    </>
  );
}
