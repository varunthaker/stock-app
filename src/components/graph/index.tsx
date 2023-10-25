import { Bar } from "react-chartjs-2";
import { CategoryScale, Chart, registerables } from "chart.js";
import { ProductType } from "../../../db/model/Product";
Chart.register(CategoryScale);
Chart.register(...registerables);

interface productGraphDataType {
  productGraphData: ProductType;
}

export default function Graph({ productGraphData }: productGraphDataType) {
  const axisX = productGraphData?.map((product: ProductType) => product.name);
  const axisY = productGraphData?.map((product: ProductType) => {
    return product.stockouts?.reduce(
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
    <>
      <h1>Graph</h1>
      <div>
        <Bar
          data={dataLine}
          options={{
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
    </>
  );
}
