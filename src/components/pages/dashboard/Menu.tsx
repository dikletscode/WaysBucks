import React from "react";
import Dashboard from "./admin";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const MenuAdmin = () => {
  const data = [
    { name: "Page A", uv: 1500, pv: 2400, amt: 2400 },
    { name: "Page b", uv: 40, pv: 2400, amt: 2400 },
    { name: "Page c", uv: 2000, pv: 2400, amt: 2400 },
  ];
  return (
    <div className="pt-40 container w-full ">
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </div>
  );
};
export default MenuAdmin;
