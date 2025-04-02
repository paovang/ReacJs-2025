import { Navigate, Outlet } from "react-router-dom";

const authGuard = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return <Outlet />;
  }

  return <Navigate to="/user"/>;
};

export default authGuard;