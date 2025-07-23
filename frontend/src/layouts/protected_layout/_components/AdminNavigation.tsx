import {
  Home as HomeIcon,
  Box,
  Boxes,
  FileClock,
  History,
  Layers,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  {
    title: "Trang chủ",
    icon: <HomeIcon />,
    url: "",
  },
  {
    title: "Đang thực hiện",
    icon: <FileClock />,
    url: "current-order",
  },
  {
    title: "Lịch sử đơn hàng",
    icon: <History />,
    url: "history-order",
  },
  {
    title: "Thực đơn",
    icon: <Box />,
    url: "menu-item",
  },
  {
    title: "Danh mục phân loại",
    icon: <Layers />,
    url: "menu-category",
  },
  {
    title: "Danh mục lựa chọn",
    icon: <Boxes />,
    url: "option-group",
  },
];

const AdminNavigation = () => {
  const location = useLocation();
  return (
    <aside className="z-10 fixed border-r-2 top-20 w-48 bg-white left-0 hidden flex-col sm:flex h-full">
      <nav className="min-w-max flex flex-col justify-between items-start gap-4 sm:py-3">
        {navLinks.map((link) => {
          return (
            <Link
              to={`${link.url}`}
              key={link.title}
              className={`${
                location.pathname.split("/").pop() === link.url &&
                "bg-slate-100"
              } flex space-x-1 p-2  items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground md:h-10`}
            >
              {link.icon}
              <span className="">{link.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminNavigation;
