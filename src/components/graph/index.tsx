import { Bar } from "react-chartjs-2";
import { CategoryScale, Chart, registerables } from "chart.js";
import { ProductType } from "@/db/model/Product";
import classes from "@/styles/AnalysisPage.module.css";

Chart.register(CategoryScale);
Chart.register(...registerables);

interface productGraphDataType {
  productGraphData: ProductType;
}

export default function Graph({ productGraphData }: productGraphDataType) {
  //@ts-ignore
  const axisX = productGraphData?.map((product: ProductType) => product.name);

  const axisY = productGraphData?.map((product: ProductType) => {
    //@ts-ignore
    return product.stockouts?.reduce(
      //@ts-ignore
      (total: number, stockOut: number) => total + stockOut.stockOutQty,
      0
    );
  });

  const dataLine = {
    labels: axisX,
    datasets: [
      {
        label: "Product Sale in Unit",
        backgroundColor: "rgba(75,192,192,1)",
        data: axisY,
        fill: false,
        borderColor: "#742774",
      },
    ],
  };
  return (
    <div className={classes.chart}>
      <h2 className={classes.chart_header}>Product Sale</h2>
      <p className={classes.description}>Quick Overview for Product Sale</p>
      <div className={classes.chartSubContainer}>
        <Bar
          //@ts-ignore
          data={dataLine}
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
