import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#eeb200", "#F3C733", "#F7DA66", "#FAE799", "#FDF3CC"];

// Custom label function for line shape (upwards first, then right)
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  index,
}) => {
  const RADIAN = Math.PI / 180;
  const x1 = cx + (outerRadius + 5) * Math.cos(-midAngle * RADIAN); // End X of first line (vertical)
  const y1 = cy + (outerRadius + 15) * Math.sin(-midAngle * RADIAN); // End Y of first line (vertical)
  const x2 = x1 + (x1 > cx ? 20 : -20); // End X of second line (horizontal)
  const y2 = y1 - 10; // Move slightly upwards

  return (
    <g>
      {/* First Line - Moves Upwards */}
      <polyline
        points={`${cx},${cy} ${x1},${y2}`}
        stroke={COLORS[index % COLORS.length]}
        strokeWidth={2}
        fill="none"
      />

      {/* Second Line - Moves Right */}
      <polyline
        points={`${x1},${y2} ${x2},${y2}`}
        stroke={COLORS[index % COLORS.length]}
        strokeWidth={2}
        fill="none"
      />

      {/* Label Text */}
      <text
        x={x2}
        y={y2}
        textAnchor={x2 > cx ? "start" : "end"}
        fill="#333"
        fontSize={12}
      >
        {(percent * 100).toFixed(1)}%
      </text>
    </g>
  );
};


const CustomLegend = (props) => {
  const { payload } = props;
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {payload.map((entry, index) => (
        <li key={`item-${index}`} style={{ color: `${COLORS[index % COLORS.length]}`, fontSize: "12px", marginBottom: "10px" }}>
         ⬤ <p style={{color:"black",display:"inline-block",margin:"0px 5px"}}>{entry.value}</p> 
        </li>
      ))}
    </ul>
  );
};

const TopDishesPieChart = ({ data }) => {
  // const COLORS = ["#C0262D", "#0E96F16", "#008D96", "#575764", "#EEB200"];
  // const COLORS = ["#008d96","#e96f16","#eeb200","#575764","#c0262d"];
  const COLORS = ["#eeb200", "#F3C733", "#F7DA66", "#FAE799", "#FDF3CC"];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart width="100%" height="100%">
        <Pie
          data={data}
          cx="70%"
          cy="50%"
          innerRadius="00%"
          outerRadius="90%"
          fill="#8884d8"
          dataKey="orders"
          nameKey="dish"
          label={renderCustomizedLabel} // Custom Label
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          layout="vertical"
          align="left"
          verticalAlign="middle"
          // iconType="circle"
          // wrapperStyle={{
          //   color: "black", // Gray color for legend text
          //   fontSize: "12px", // Adjust font size
          // }}
          content={<CustomLegend />}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TopDishesPieChart;
