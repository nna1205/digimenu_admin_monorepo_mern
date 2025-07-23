import { useEffect } from "react";
import { getMenuItems } from "./_reducer/menuitemActions";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import MenuItemCreateForm from "./_components/MenuItemCreateForm";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./tableDefinition";
import TotalSalesBarChart from "./_components/TotalSaleByItemBarChart";
import TotalSalesPieChart from "./_components/TotalSaleByItemPieChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MenuItemPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { menuitem, isLoading } = useAppSelector((state) => state.menuitem);

  const totalItemPrice = menuitem.reduce((total, item) => {
    return total + parseFloat(item.price);
  }, 0);
  const avgPrice = totalItemPrice / menuitem.length;

  useEffect(() => {
    dispatch(getMenuItems(id as string));
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (menuitem.length > 0) {
    return (
      <div className={`flex flex-col gap-3 mt-6`}>
        <span className="text-xl font-bold">Doanh thu theo sản phẩm</span>

        <div className="flex justify-between items-center w-full">
          <TotalSalesBarChart />
          <div className="flex flex-col">
            <div
              className={`grid grid-cols-2 justify-center items-center gap-3 w-full`}
            >
              <div
                className={`flex flex-col min-w-[180px] max-w-52 border-2 px-6 py-3 rounded-xl`}
              >
                <span className="opacity-60 mb-1">Tổng sản phẩm</span>
                <span className="text-xl font-bold">
                  {`${menuitem.length} sản phẩm`}
                </span>
              </div>
              <div
                className={`flex flex-col min-w-[180px] max-w-52 border-2 px-6 py-3 rounded-xl`}
              >
                <span className="opacity-60 mb-1">Giá trị trung bình</span>
                <span className="text-xl font-bold">
                  {`~ ${avgPrice.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}`}
                </span>
              </div>
            </div>
            <TotalSalesPieChart />
          </div>
        </div>
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="account">Danh sách sản phẩm</TabsTrigger>
            <TabsTrigger value="password">Thêm sản phẩm mới</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <DataTable columns={columns} data={menuitem} />
          </TabsContent>
          <TabsContent value="password">
            <MenuItemCreateForm />
          </TabsContent>
        </Tabs>
      </div>
    );
  }
  return <div>Cửa hàng chưa có món nào</div>;
};

export default MenuItemPage;
