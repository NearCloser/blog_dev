import { Header } from "@/components";
import React from "react";

export const MainLayout = ({ children }: { children: React.ReactChild }) => {
  return (
    <div id="main_layout">
      <Header />
      <div id="main_layout_children_ontainer">{children}</div>
    </div>
  );
};
