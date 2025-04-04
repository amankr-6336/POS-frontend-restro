import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const data = [
  { time: "10 AM", occupancy: 20 },
  { time: "11 AM", occupancy: 40 },
  { time: "12 PM", occupancy: 60 },
  { time: "1 PM", occupancy: 80 },
  { time: "2 PM", occupancy: 50 },
  { time: "3 PM", occupancy: 70 },
  { time: "4 PM", occupancy: 90 },
  { time: "5 PM", occupancy: 60 },
  { time: "6 PM", occupancy: 30 },
];

const OccupancyLineChart = () => {
  return (
    <div className="linechart-container" style={{width:"100%" ,height:"100%"}}>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" stroke="#e5e5e6" tickLine={false} tick={{dy:5,fill: "#575764", fontSize: 10}} />
        <YAxis domain={[0, 100]} stroke="#e5e5e6" tickLine={false} tick={{ dx: -10,fill: "#575764", fontSize: 10  }}/>
        <Tooltip />
        {/* <defs>
          <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4285F4" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#4285F4" stopOpacity={0.3} />
          </linearGradient>
        </defs> */}

        <defs>
            <linearGradient id="colorOccupancy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#eeb300" stopOpacity={0.8} />  {/* Darker near the line */}
              <stop offset="95%" stopColor="#f7da66" stopOpacity={0.3} /> {/* Lighter at the bottom */}
            </linearGradient>
          </defs>

        {/* <Area type="monotone" dataKey="occupancy" stroke="#eeb300" fill="#eeb300" fillOpacity={1} /> */}
        <Area type="monotone" dataKey="occupancy" stroke="#eeb300" fill="url(#colorOccupancy)" fillOpacity={1} />
        <Line type="monotone" dataKey="occupancy" stroke="#eeb300" strokeWidth={2} dot={{ r: 0 }} />
      </AreaChart>
    </ResponsiveContainer>
    </div>
  );
};

export default OccupancyLineChart;
