import React from "react";
import Dashboard from "./admin";
import DashboardAnalysis from "./dashboard";
import ListProduct from "./ListProduct";
import ListTopping from "./ListTopping";
import GetAllUser from "./ListUsers";

const Child = ({ name }: { name: string }) => {
  switch (name) {
    case "dashboard":
      return <DashboardAnalysis />;
    case "transaction":
      return <Dashboard />;
    case "chat":
      return <GetAllUser />;
    case "listproduct":
      return <ListProduct />;
    case "listtopping":
      return <ListTopping />;
    default:
      return <DashboardAnalysis />;
  }
};

export default Child;
