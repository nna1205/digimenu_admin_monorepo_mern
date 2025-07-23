import { Outlet } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import RootNavigation from "./_components/RootNavigation";
import { ClerkProvider } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const RootLayout = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
    >
      <RootNavigation />
      <Separator />
      <div className="w-screen flex flex-col justify-center items-center pl-40 mt-20">
        <Outlet />
      </div>
      <Toaster />
    </ClerkProvider>
  );
};

export default RootLayout;
