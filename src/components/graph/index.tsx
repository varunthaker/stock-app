import { Bar } from "react-chartjs-2";
import { CategoryScale, Chart, registerables } from "chart.js";
import { ProductType } from "@/db/model/Product";
import classes from "@/styles/AnalysisPage.module.css";
import { StockOut } from "@/db/model/StockOut";

Chart.register(CategoryScale);
Chart.register(...registerables);

interface productGraphDataType {
  productGraphData: ProductType[];
}

export default function Graph({ productGraphData }: productGraphDataType) {
  const axisX = productGraphData?.map((product: ProductType) => product.name);

  const axisY = productGraphData?.map((product: ProductType) => {
    return product.stockouts?.reduce(
      (total: number, stockOut: StockOut) => total + stockOut.stockOutQty,
      0
    );
  });

  const dataLine = {
    labels: axisX,
    datasets: [
      {
        label: "Product Sale in Unit",
        backgroundColor: [
          "rgba(65, 164, 255, 0.6)",
          "rgba(65, 164, 255, 0.8)",
          "rgba(65, 164, 255, 1)",
        ],
        data: axisY,
        fill: false,
        borderColor: "rgba(65, 164, 255, 0.2)",
      },
    ],
  };
  return (
    <div className={classes.chart}>
      <p className={classes.chart_header}>Product Sale</p>
      <p className={classes.description}>Quick Overview for Product Sale</p>
      <div className={classes.chartSubContainer}>
        <Bar
          data={dataLine}
          title="Product Sale"
          options={{
            //@ts-ignore
            title: {
              display: true,
              text: "Product Sale",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    </div>
  );
}
