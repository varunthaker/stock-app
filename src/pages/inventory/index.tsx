import Layout from "@/components/layout/Layout";
import InventoryProduct from "@/components/inventory";
import useSWR from "swr";
import { useState } from "react";
import { ProductType } from "@/db/model/Product";
import PDFGenerator from "@/components/pdf-generator";
import classes from "@/styles/InventoryPage.module.css";
import ProductNotFound from "@/components/product/productnotfound";

export default function InventoryPage() {
  const [userSearchInput, setUserSearchInput] = useState("");
  const {
    data: products,
    isLoading,
    error,
    mutate,
  } = useSWR("/api/products", { fallbackData: [] });
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserSearchInput(event.target.value);
  }

  const filteredProducts = products.filter((product: ProductType) => {
    return product.name.toLowerCase().includes(userSearchInput.toLowerCase());
  });

  return (
    <div className={classes.inventory_page}>
      <h1 className={classes.page_header}>Inventory</h1>
      <div className={classes.search_container}>
        <input
          className={classes.input}
          type="text"
          placeholder="🔎    Search "
          onChange={(event) => handleInputChange(event)}
        ></input>
      </div>
      <div>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: ProductType) => {
            return (
              <div key={product._id}>
                <InventoryProduct product={product} mutate={mutate} />
              </div>
            );
          })
        ) : (
          <ProductNotFound searchQuery={userSearchInput} />
        )}
      </div>
      <div className={classes.print_button}>
        <PDFGenerator dataToPrint={products} />
      </div>

      <Layout />
    </div>
  );
}
