import { TOrder } from "./OrderHistory.type";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { formatDateTime } from "@/lib/formatDateTime";
import { useAppDispatch } from "@/redux/hook";
import { deleteOrder } from "@/features/orderhistory/_reducer/orderhistoryActions";

function OrderAction({ order }: { order: TOrder }) {
  const dispatch = useAppDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(order.id)}
        >
          Copy đơn hàng
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Cập nhật trạng thái</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            dispatch(deleteOrder(order.id));
            toast({
              title: "Xóa đơn hàng thành công",
              description: "Kiểm tra để biết thêm chi tiết",
            });
          }}
          className={`text-red-500`}
        >
          Xóa đơn hàng
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

//Columns Definitions
const columns: ColumnDef<TOrder>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const value: string = String(row.getValue("id"))
        .substring(0, 8)
        .toUpperCase();
      return <div className="text-center font-medium">{value}</div>;
    },
  },
  {
    accessorKey: "user_id",
    header: "Khách",
    cell: ({ row }) => {
      const value: string = String(row.getValue("user_id")).substring(0, 8);
      return <div className="text-center">{value}</div>;
    },
  },
  {
    accessorKey: "total_item",
    header: "Tổng món",
    cell: ({ row }) => {
      return (
        <div className="text-center">{`${row.getValue(
          "total_item"
        )} item(s)`}</div>
      );
    },
  },
  {
    accessorKey: "total_price",
    header: "Tổng tiền",
    cell: ({ row }) => {
      const formatted = parseInt(row.getValue("total_price")).toLocaleString(
        "it-IT",
        {
          style: "currency",
          currency: "VND",
        }
      );

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "is_take_away",
    header: "Phục vụ",
    cell: ({ row }) => {
      const value: string = Boolean(row.getValue("is_take_away"))
        ? "Mang về"
        : "Tại chỗ";
      return <div className="text-center">{value}</div>;
    },
  },
  {
    accessorKey: "payment_method",
    header: "Thanh toán",
    cell: ({ row }) => {
      const value: string =
        row.getValue("payment_method") === "Cash" ? "Tiền mặt" : "Chuyển khoản";
      return <div className="text-center font-medium">{value}</div>;
    },
  },
  {
    accessorKey: "is_paid",
    header: "Trạng thái",
    cell: ({ row }) => {
      const value: string = Boolean(row.getValue("is_paid"))
        ? "Đã nhận"
        : "Chưa nhận";
      return (
        <div
          className={`${
            Boolean(row.getValue("is_paid")) ? "bg-green-200" : "bg-gray-200"
          } rounded-full px-2 py-1 text-center font-medium`}
        >
          {value}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formatted = formatDateTime(row.getValue("created_at")).substring(
        0,
        11
      );

      return <div className="text-center">{formatted}</div>;
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Finished at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formatted = formatDateTime(row.getValue("updated_at")).substring(
        0,
        11
      );

      return <div className="text-center">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      return <OrderAction order={order} />;
    },
  },
];

export default columns;
