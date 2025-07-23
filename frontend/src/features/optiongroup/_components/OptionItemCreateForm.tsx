import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { CirclePlus } from "lucide-react";
import { useAppDispatch } from "@/redux/hook";
import { createOptionItem } from "../_reducer/optiongroupActions";
import { OptionItemSchema } from "../OptionGroup.type";

function OptionItemCreateForm({
  option_group_id,
}: {
  option_group_id: string;
}) {
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof OptionItemSchema>>({
    resolver: zodResolver(OptionItemSchema),
    defaultValues: {
      name: "",
      option_group_id: option_group_id,
      price: "",
    },
  });

  async function onSubmit() {
    const formData = {
      name: form.getValues("name"),
      option_group_id: option_group_id,
      price: form.getValues("price"),
    };
    dispatch(createOptionItem(formData));
    console.log(JSON.stringify(formData));
    toast({
      title: "Thêm mới lựa chọn thành công",
      description: "Kiểm tra màn hình để xem thay đổi",
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`flex justify-center items-center gap-3 font-bold border-2 rounded-xl p-2 min-w-[240px] min-h-max`}
        >
          Thêm lựa chọn mới
          <CirclePlus />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lựa chọn mới</DialogTitle>
          <DialogDescription>
            Điền tên lựa chọn dưới đây. Nhấn hoàn thành để lưu
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Tên lựa chọn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Giá lựa chọn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Thêm lựa chọn</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default OptionItemCreateForm;
