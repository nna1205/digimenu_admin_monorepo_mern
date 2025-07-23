import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppDispatch } from "@/redux/hook";
import { Trash2 } from "lucide-react";
import { deleteMenuItem } from "../_reducer/menuitemActions";
import { toast } from "@/components/ui/use-toast";

export default function DeleteDialog({ item_id }: { item_id: string }) {
  const dispatch = useAppDispatch();

  return (
    <Dialog>
      <DialogTrigger className={`text-red-500`}>
        <Trash2 />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xác nhận xóa sản phẩm</DialogTitle>
          <DialogDescription>
            Sau khi xóa, sản phẩm sẽ không thể khôi phục
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Hủy</Button>
          </DialogClose>
          <Button
            onClick={() => {
              dispatch(deleteMenuItem(item_id));
              toast({
                title: "Xóa sản phẩm thành công",
                description: "Kiểm tra màn hình để xem thay đổi",
              });
            }}
          >
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
