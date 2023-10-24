import Layout from "@/components/layout/Layout";
import Product from "@/components/product/product";
import StockInModal from "@/components/stockin-modal";
import InventoryProduct from "@/components/inventory";

import useSWR from "swr";
import { ProductType } from "../../../db/model/Product";

export default function InventoryPage() {
  const {
    data: products,
    isLoading,
    error,
  } = useSWR("/api/products", { fallbackData: [] });
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <h1>Inventory</h1>
      <div>
        {products.map((product: ProductType) => {
          return (
            <div key={product._id}>
              <InventoryProduct product={product} />
            </div>
          );
        })}
      </div>

      <Layout />
    </>
  );
}
