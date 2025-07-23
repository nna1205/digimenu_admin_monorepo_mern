import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { formatDateTime } from "@/lib/formatDateTime";
import MenuCategoryUpdateForm from "./_components/MenuCategoryUpdateForm";
import { TMenuCategory } from "./MenuCategory.type";
import { ColumnDef } from "@tanstack/react-table";
import DeleteDialog from "./_components/MenuCategoryDeleteDialog";

export const columns: ColumnDef<TMenuCategory>[] = [
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
    header: "Tên",
  },
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
      const formatted = formatDateTime(row.getValue("created_at")).substring(
        0,
        11
      );

      return <div className="text-center">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className={`flex justify-center items-center gap-3`}>
          <MenuCategoryUpdateForm initialValue={category} />
          <DeleteDialog categoryid={category.id} />
        </div>
      );
    },
  },
];
