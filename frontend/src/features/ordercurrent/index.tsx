import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataTable } from "@/components/ui/data-table";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getOrderCurrentByStore } from "@/features/ordercurrent/_reducer/ordercurrentActions";
import columns from "./tableDefinition";
import supabaseClient from "@/supabaseClient";
import { RealtimePostgresUpdatePayload } from "@supabase/supabase-js";
import { TOrderStatusUpdate } from "@/features/ordercurrent/OrderCurrent.type";
import { toast } from "@/components/ui/use-toast";

const OrderCurrentPage = () => {
  const { id: store_id } = useParams();
  const dispatch = useAppDispatch();
  const { ordercurrent, isLoading } = useAppSelector(
    (state) => state.ordercurrent
  );

  useEffect(() => {
    dispatch(getOrderCurrentByStore(store_id as string));
  }, [dispatch]);

  const handleUpdate = (
    payload: RealtimePostgresUpdatePayload<TOrderStatusUpdate>
  ) => {
    dispatch(getOrderCurrentByStore(store_id as string));
    toast({
      title: "Trạng thái đơn hàng đã được cập nhật",
      description: `Đơn hàng ${payload.new.id} đã ${payload.new.status}`,
    });
  };

  const handleInsert = (payload: any) => {
    dispatch(getOrderCurrentByStore(store_id as string));
    console.log(payload);
    toast({
      title: "Bạn có đơn hàng mới",
      description: `Kiểm tra thông tin chi tiết đơn hàng`,
    });
  };

  supabaseClient
    .channel("ordermenu")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "ordermenu" },
      handleUpdate
    )
    .subscribe();

  supabaseClient
    .channel("ordermenu")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "ordermenu",
      },
      handleInsert
    )
    .subscribe();

  if (isLoading) return <p>Loading...</p>;
  if (ordercurrent.length > 0) {
    return (
      <div className={`flex flex-col gap-3 mt-6`}>
        <span className={`font-bold text-xl`}>Đơn hàng đang thực hiện</span>
        <DataTable columns={columns} data={ordercurrent} />
      </div>
    );
  }
  return <div>Cửa hàng chưa có đơn hàng nào</div>;
};

export default OrderCurrentPage;
