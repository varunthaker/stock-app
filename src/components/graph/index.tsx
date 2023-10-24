import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, registerables } from "chart.js";
Chart.register(CategoryScale);
Chart.register(...registerables);

export default function Graph() {
  const dataLine = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Product Sale in Unit",
        data: [33, 25, 35, 51, 54, 76],
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
