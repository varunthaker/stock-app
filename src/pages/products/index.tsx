import Layout from "@/components/layout/Layout";
import Button from "@/components/product/button/productbutton";
// import ProductSearchForm from "@/components/product/form";
import Product from "@/components/product/product";
import useSWR from "swr";
import { ProductType } from "../../../db/model/Product";
import { useState } from "react";
import ProductNotFound from "@/components/product/productnotfound";

export default function ProductPage() {
  const [userSearchInput, setUserSearchInput] = useState("");
  const {
    data: products,
    error,
    isLoading,
  } = useSWR("/api/products", { fallbackData: [] });
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // console.log("Products are", products);

  function handleCreate() {
    console.log("Create Button Clicked");
  }

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
          // value={userSearchInput}
        ></input>
        {/* <button type="button" onClick={(event) => handleSearchSubmit(event)}>
          🔎
        </button> */}
      </div>
      <ul>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: ProductType) => {
            return (
              <li key={product._id}>
                <Product product={product} />
              </li>
            );
          })
        ) : (
          <ProductNotFound searchQuery={userSearchInput} />
        )}
        c
      </ul>
      <Button text={"Create"} handleClick={handleCreate} />
      <Layout />
    </>
  );
}
