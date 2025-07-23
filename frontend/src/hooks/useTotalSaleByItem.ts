import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getHistoryOrderByStore } from "@/features/orderhistory/_reducer/orderhistoryActions";
import { TOrder } from "../features/orderhistory/OrderHistory.type";

interface TotalSaleByItem {
    id: string;
    name: string;
    totalsale: string;
    percentage: number;
}

export const useTotalSaleByItem = (store_id: string) => {
  const dispatch = useAppDispatch();
  const {orderhistory, isLoading, error} = useAppSelector(state => state.orderhistory);

    //iterate over orderhistory.orderitem to get total price of each item
    //and return an array of TotalSaleByItem
    const totalsale = orderhistory.reduce((acc: TotalSaleByItem[], order: TOrder) => {
      const orderItem = order.orderitem;
      const totalSaleByStore = orderItem.reduce((acc, item) => {
        const itemTotalPrice =
          typeof item.total_price === "string"
            ? parseFloat(item.total_price)
            : item.total_price;
        return acc + itemTotalPrice;
      }, 0);
      orderItem.forEach((item) => {
        const itemTotalPrice =
          typeof item.total_price === "string"
            ? parseFloat(item.total_price)
            : item.total_price;
        const itemId = item.id;
        const itemName = item.menuitem.name;
        const totalSale = itemTotalPrice * item.quantity;
        const percentage = Math.round((totalSale / totalSaleByStore) * 100);
        acc.push({
          id: itemId,
          name: itemName,
          totalsale: totalSale.toString(),
          percentage: percentage,
        });
      });
      return acc;
    }, []);
  
    useEffect(() => {
      dispatch(getHistoryOrderByStore(store_id as string));
    }, [store_id]);
  
    return { totalsale, isLoading, error };
  };