import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataTable } from "@/components/ui/data-table";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getHistoryOrderByStore } from "@/features/orderhistory/_reducer/orderhistoryActions";
import columns from "./tableDefinition";
import DailySalesChart, {
  calculateDailySales,
} from "./_components/OrderSaleByDate";
import TakeawayPieChart from "./_components/TakeawaytPieChart";

const OrderHistoryPage = () => {
  const { id: store_id } = useParams();
  const dispatch = useAppDispatch();
  const { orderhistory, isLoading } = useAppSelector(
    (state) => state.orderhistory
  );
  const totalSales = orderhistory.reduce((total, order) => {
    const orderTotalPrice =
      typeof order.total_price === "string"
        ? parseFloat(order.total_price)
        : order.total_price;
    return total + orderTotalPrice;
  }, 0);
  const avgSales = totalSales / orderhistory.length;
  const totalTakeawaySale = orderhistory
    .filter((order) => order.is_take_away)
    .reduce((total, order) => {
      const orderTotalPrice =
        typeof order.total_price === "string"
          ? parseFloat(order.total_price)
          : order.total_price;
      return total + orderTotalPrice;
    }, 0);

  const totalDineInSale = orderhistory
    .filter((order) => !order.is_take_away) // Filter dine-in orders
    .reduce((total, order) => {
      const orderTotalPrice =
        typeof order.total_price === "string"
          ? parseFloat(order.total_price)
          : order.total_price;
      return total + orderTotalPrice;
    }, 0);

  const dailySalesData = calculateDailySales(orderhistory, 2024, 5);

  useEffect(() => {
    dispatch(getHistoryOrderByStore(store_id as string));
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (orderhistory.length > 0) {
    return (
      <div className={`flex flex-col gap-3 mt-6`}>
        <span className={`font-bold text-xl`}>Đơn hàng đã hoàn thành</span>
        <div className="flex justify-between items-center w-full">
          <DailySalesChart dailySalesData={dailySalesData} />
          <div className={`grid grid-cols-2 justify-center items-center gap-3`}>
            <div className={`flex flex-col border-2 px-6 py-3 rounded-xl`}>
              <span className="opacity-60 mb-1">{`Tổng doanh thu (${orderhistory.length} đơn)`}</span>
              <span className="text-xl font-bold">
                {`${totalSales.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}`}
              </span>
            </div>
            <div className={`flex flex-col border-2 px-6 py-3 rounded-xl`}>
              <span className="opacity-60 mb-1">Đơn hàng trung bình</span>
              <span className="text-xl font-bold">
                {`~ ${avgSales.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}`}
              </span>
            </div>
            <TakeawayPieChart orders={orderhistory} />
            <div className="flex flex-col gap-3">
              <div className={`flex flex-col px-6 py-1 rounded-xl`}>
                <span className="opacity-60 mb-1">Doanh thu ăn tại chỗ</span>
                <span className="text-xl font-bold text-[#00C49F]">
                  {`${totalDineInSale.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}`}
                </span>
              </div>
              <div className={`flex flex-col px-6 py-1 rounded-xl`}>
                <span className="opacity-60 mb-1">Doanh thu ăn mang về</span>
                <span className="text-xl font-bold text-[#0088FE]">
                  {`${totalTakeawaySale.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}`}
                </span>
              </div>
            </div>
          </div>
        </div>
        <DataTable columns={columns} data={orderhistory} />
      </div>
    );
  }
  return <div>Cửa hàng chưa có đơn hàng nào</div>;
};

export default OrderHistoryPage;
