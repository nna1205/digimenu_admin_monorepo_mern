import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilePenLine } from "lucide-react";
import { useParams } from "react-router-dom";
import {
  Schema,
  TMenuCategory,
  TUpdateMenuCategory,
} from "@/features/menucategory/MenuCategory.type";
import { useAppDispatch } from "@/redux/hook";
import { updateMenuCategory } from "@/features/menucategory/_reducer/menucategoryActions";

const FormSchema = Schema;

const MenuCategoryUpdateForm = ({
  initialValue,
}: {
  initialValue: TMenuCategory | null;
}) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { id: storeid } = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      store_id: storeid as string,
      name: initialValue?.name !== "" ? initialValue?.name : "",
    },
  });

  async function onSubmit() {
    const formData: TUpdateMenuCategory = {
      id: initialValue?.id as string,
      store_id: storeid as string,
      name: form.getValues("name")
        ? form.getValues("name")
        : (initialValue?.name as string),
    };
    dispatch(updateMenuCategory(formData));
    toast({
      title: "Cập nhật thông tin thành công",
      description: "Kiểm tra thông tin ở trang chủ",
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <FilePenLine />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin danh mục</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin cần chỉnh sửa. Các thông tin còn lại sẽ được giữ
            nguyên
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-3 my-6"
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
                <Button type="submit">Cập nhật</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MenuCategoryUpdateForm;
