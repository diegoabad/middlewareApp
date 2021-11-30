import "./Admin.css";

import DonutChart from "react-donut-chart";

const reactDonutChartdata = [
  {
    label: "Cantidad de Juniors",
    value: 35,
    color: "#00E396",
  },
  {
    label: "RDC",
    value: 65,
    color: "#FEB019",
  },
  {
    label: "STOCKIST",
    value: 100,
    color: "#FF4560",
  },
];
const reactDonutChartBackgroundColor = [
  "#00E396",
  "#FEB019",
  "#FF4560",
  "#775DD0",
];
const reactDonutChartInnerRadius = 0.5;
const reactDonutChartSelectedOffset = 0.04;
const reactDonutChartHandleClick = (item, toggled) => {
  if (toggled) {
    console.log(item);
  }
};
let reactDonutChartStrokeColor = "#FFFFFF";
const reactDonutChartOnMouseEnter = (item) => {
  let color = reactDonutChartdata.find((q) => q.label === item.label).color;
  reactDonutChartStrokeColor = color;
};

export default function AdminHomeCharts() {
  return (
    <div className="container">
      <h1>Graficos</h1>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <h2>Juniors</h2>
          <DonutChart
            width={500}
            onMouseEnter={(item) => reactDonutChartOnMouseEnter(item)}
            strokeColor={reactDonutChartStrokeColor}
            data={reactDonutChartdata}
            colors={reactDonutChartBackgroundColor}
            innerRadius={reactDonutChartInnerRadius}
            selectedOffset={reactDonutChartSelectedOffset}
            onClick={(item, toggled) =>
              reactDonutChartHandleClick(item, toggled)
            }
          />
        </div>
        <div className="col-md-6">
          <h2>Company</h2>
          <DonutChart
            width={500}
            onMouseEnter={(item) => reactDonutChartOnMouseEnter(item)}
            strokeColor={reactDonutChartStrokeColor}
            data={reactDonutChartdata}
            colors={reactDonutChartBackgroundColor}
            innerRadius={reactDonutChartInnerRadius}
            selectedOffset={reactDonutChartSelectedOffset}
            onClick={(item, toggled) =>
              reactDonutChartHandleClick(item, toggled)
            }
          />
        </div>
      </div>

      <hr />
    </div>
  );
}
