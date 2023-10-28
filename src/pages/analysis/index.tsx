import Layout from "@/components/layout/Layout";
import useSWR from "swr";
import InventoryAnalysisTable from "@/components/table";
import Graph from "@/components/graph";
import classes from "@/styles/AnalysisPage.module.css";

export default function Analysis() {
  const {
    data: products,
    error,
    isLoading,
  } = useSWR("/api/products", { fallbackData: [] });
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className={classes.analysis_page}>
      <h1 className={classes.page_header}>Dashboard</h1>
      <div className={classes.analysis}>
        <Graph productGraphData={products} />
        <InventoryAnalysisTable productTableData={products} />
      </div>
      <Layout />
    </div>
  );
}
