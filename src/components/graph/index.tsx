import { Bar } from "react-chartjs-2";
import { CategoryScale, Chart, registerables } from "chart.js";
import { ProductType } from "../../../db/model/Product";
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
    <>
      <h2>Graph</h2>
      <div>
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
    </>
  );
}
