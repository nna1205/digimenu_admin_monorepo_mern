import { deleteMenuCategory } from "../_reducer/menucategoryActions";
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
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hook";
import { Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export default function DeleteDialog({ categoryid }: { categoryid: string }) {
  const dispatch = useAppDispatch();

  return (
    <Dialog>
      <DialogTrigger className={`text-red-500`}>
        <Trash2 />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xác nhận xóa danh mục</DialogTitle>
          <DialogDescription>
            Sau khi xóa, danh mục sẽ không thể khôi phục
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Hủy</Button>
          </DialogClose>
          <Button
            onClick={() => {
              dispatch(deleteMenuCategory(categoryid));
              toast({
                title: "Xóa danh mục thành công",
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
