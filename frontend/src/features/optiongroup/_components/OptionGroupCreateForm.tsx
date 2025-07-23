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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { CirclePlus } from "lucide-react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "@/redux/hook";
import {
  getOptionGroupByStore,
  createOptionGroup,
} from "../_reducer/optiongroupActions";
import { OptionGroupSchema } from "../OptionGroup.type";

function OptionGroupCreateForm() {
  const { id: store_id } = useParams();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof OptionGroupSchema>>({
    resolver: zodResolver(OptionGroupSchema),
    defaultValues: {
      name: "",
      can_have_many: false,
    },
  });

  async function onSubmit() {
    const formData = {
      store_id: store_id as string,
      name: form.getValues("name"),
      can_have_many: form.getValues("can_have_many"),
    };
    dispatch(createOptionGroup(formData));
    dispatch(getOptionGroupByStore(store_id as string));
    toast({
      title: "Thêm mới danh mục thành công",
      description: "Kiểm tra màn hình để xem thay đổi",
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`flex justify-center items-center gap-3 font-bold border-2 rounded-xl p-2 min-w-[240px] min-h-max`}
        >
          Thêm danh mục mới
          <CirclePlus />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Danh mục mới</DialogTitle>
          <DialogDescription>
            Điền tên danh mục dưới đây. Nhấn hoàn thành để lưu
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
                    <Input placeholder="Tên danh mục" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="can_have_many"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Chọn nhiều lựa chọn
                    </FormLabel>
                    <FormDescription>
                      Khách hàng có thể chọn nhiều hơn 1 lựa chọn
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Thêm danh mục</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default OptionGroupCreateForm;
