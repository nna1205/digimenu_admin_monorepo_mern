import { TMenuItemWithCategory } from "./MenuItem.type";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { formatDateTime } from "@/lib/formatDateTime";
import MenuItemUpdateForm from "./_components/MenuItemUpdateForm";
import { MenuItemOptionContainer } from "./_components/MenuItemOptionGroupForm";
import DeleteDialog from "./_components/MenuItemDeleteDialog";

export const columns: ColumnDef<TMenuItemWithCategory>[] = [
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
    accessorKey: "name",
    header: "Tên món",
    cell: ({ row }) => {
      const value: string = String(row.getValue("name"));
      return <div className="text-center">{value}</div>;
    },
  },
  {
    accessorKey: "price",
    header: "Giá",
    cell: ({ row }) => {
      const formatted = parseInt(row.getValue("price")).toLocaleString(
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
    accessorKey: "description",
    header: "Mô tả",
    cell: ({ row }) => {
      return (
        <div className="max-w-[180px] truncate">
          {row.getValue("description")
            ? row.getValue("description")
            : "Chưa có mô tả"}
        </div>
      );
    },
  },
  //   {
  //     accessorKey: "menucategory.name",
  //     header: "Danh mục",
  //     cell: ({ row }) => {
  //       return (
  //         <div className="text-center font-medium">
  //           {row.getValue("menucategory.name")}
  //         </div>
  //       );
  //     },
  //   },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formatted = formatDateTime(row.getValue("created_at"));

      return <div className="text-center">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const menuitem = row.original;
      return (
        <div className={`flex justify-center items-center gap-3`}>
          <MenuItemOptionContainer item_id={menuitem.id} />
          <MenuItemUpdateForm initialValue={menuitem} />
          <DeleteDialog item_id={menuitem.id} />
        </div>
      );
    },
  },
];
