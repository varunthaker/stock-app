import Layout from "@/components/layout/Layout";
import InventoryProduct from "@/components/inventory";
import useSWR from "swr";
import { ProductType } from "@/db/model/Product";
import PDFGenerator from "@/components/pdf-generator";
import classes from "@/pages/inventory/InventoryPage.module.css";

export default function InventoryPage() {
  const {
    data: products,
    isLoading,
    error,
    mutate,
  } = useSWR("/api/products", { fallbackData: [] });
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className={classes.inventory_page}>
      <h1 className={classes.page_header}>Inventory</h1>
      <div>
        {products?.map((product: ProductType) => {
          return (
            <div key={product._id}>
              <InventoryProduct product={product} mutate={mutate} />
            </div>
          );
        })}
      </div>
      <div className={classes.print_button}>
        <PDFGenerator dataToPrint={products} />
      </div>

      <Layout />
    </div>
  );
}
