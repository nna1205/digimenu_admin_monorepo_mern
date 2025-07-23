import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavigation from "./_components/AdminNavigation";

export default function ProtectedLayout() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/signin");
    }
  }, [isLoaded]);

  if (!isLoaded) return "Loading...";

  return (
    <div className="w-full flex justify-start items-start space-x-6 px-3 py-1">
      <AdminNavigation />
      <Outlet />
    </div>
  );
}
