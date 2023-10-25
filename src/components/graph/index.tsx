import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, registerables } from "chart.js";
Chart.register(CategoryScale);
Chart.register(...registerables);

export default function Graph({ productGraphData }) {
  console.log("Product Data", productGraphData);

  console.log("stockOutData", productGraphData[0].stockouts);
  const axisX = productGraphData[0].stockouts?.map((stockout) => stockout.date);
  console.log("Stockout Data X-axis", axisX);

  const axisY = productGraphData[0].stockouts?.map(
    (stockout) => stockout.stockOutQty
  );

  console.log("Stockout Data Y-axis", axisY);

  const dataLine = {
    labels: axisX,
    datasets: [
      {
        label: "Product Sale in Unit",
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
        <Line
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
