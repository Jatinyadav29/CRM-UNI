import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../shared/ui/components/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 flex flex-col font-sans">
      <Navbar />

      <Outlet />
    </div>
  );
};

export default MainLayout;
