import { Bar } from "react-chartjs-2";
import { CategoryScale, Chart, registerables } from "chart.js";
Chart.register(CategoryScale);
Chart.register(...registerables);

export default function Graph({ productGraphData }) {
  console.log("Product Data", productGraphData);

  // console.log("stockOutData", productGraphData[0].stockouts);
  const axisX = productGraphData?.map((product) => product.name);
  console.log("Stockout Data X-axis", axisX);

  const axisY = productGraphData?.map((product) => product.stockouts);
  console.log("Stockout Data Y-axis", axisY);

  // .reduce((initialSale, stockout) => initialSale + stockout.stockOutQty, 0);

  const dataLine = {
    labels: axisX,
    datasets: [
      {
        label: "Product Sale in Unit",
        backgroundColor: "rgba(75,192,192,1)",
        data: [10, 5, 5],
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
