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
import { useParams } from "react-router-dom";
import { useAppDispatch } from "@/redux/hook";
import {
  getMenuCategories,
  createMenuCategory,
} from "@/features/menucategory/_reducer/menucategoryActions";
import { Schema } from "@/features/menucategory/MenuCategory.type";

const FormSchema = Schema;

function MenuCategoryCreateForm() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      store_id: id as string,
      name: "",
    },
  });

  async function onSubmit() {
    const formData = {
      store_id: id as string,
      name: form.getValues("name"),
    };
    dispatch(createMenuCategory(formData));
    dispatch(getMenuCategories(id as string));
    toast({
      title: "Thêm mới danh mục thành công",
      description: "Kiểm tra màn hình để xem thay đổi",
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Thêm danh mục mới</Button>
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
            className="w-2/3 space-y-6"
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

export default MenuCategoryCreateForm;
