import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const MainProtected = () => {
  let { isAuthenticated, user, isLoading } = useSelector((store) => store.auth);

  if (isLoading)
    return (
      <div className="h-screen text-2xl font-sans font-semibold text-green-500 flex justify-center items-center">
        <div>Loading ...</div>
      </div>
    );

  if (!user) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
};

export default MainProtected;
