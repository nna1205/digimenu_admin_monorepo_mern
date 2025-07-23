import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SignedIn,
  SignedOut,
  UserButton,
  // UserProfile,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const RootNavigation = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <div
      className={`fixed top-0 left-0 z-20 h-20 bg-white container flex justify-between items-center border-b-2`}
    >
      <div className="flex gap-1">
        <img
          src="/digimenu_logo.svg"
          alt="Logo"
          title="logo"
          className="w-8 grayscale"
        />
        <span className={`text-3xl font-bold drop-shadow-md`}>DigiMenu</span>
      </div>
      <div className={`content flex justify-center items-center gap-5 py-3`}>
        <SignedOut>
          <Link to="/signin">Đăng nhập/Đăng ký</Link>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/signin" showName={isDesktop} />
          {/* <UserProfile /> */}
        </SignedIn>
        <Select defaultValue="VI">
          <SelectTrigger className="ml-auto w-14">
            <SelectValue placeholder="Lang" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="VI">VI</SelectItem>
            <SelectItem value="EN">EN</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default RootNavigation;
