import Layout from "@/components/layout/Layout";
import useSWR from "swr";
import InventoryAnalysisTable from "@/components/table";
import Graph from "@/components/graph";

export default function Analysis() {
  const {
    data: products,
    error,
    isLoading,
  } = useSWR("/api/products", { fallbackData: [] });
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // console.log(products);

  return (
    <>
      <h1>Hi from Analysis</h1>
      <InventoryAnalysisTable productTableData={products} />
      <Graph />
      <Layout />
    </>
  );
}
