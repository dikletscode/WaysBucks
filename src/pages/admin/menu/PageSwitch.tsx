import React from "react";
import { Dashboard, Analysis, ListProduct, ListTopping, Chat } from "..";

const Child = ({ name }: { name: string }) => {
  switch (name) {
    case "dashboard":
      return <Analysis />;
    case "transaction":
      return <Dashboard />;
    case "chat":
      return <Chat />;
    case "listproduct":
      return <ListProduct />;
    case "listtopping":
      return <ListTopping />;
    default:
      return <Analysis />;
  }
};

export default Child;
