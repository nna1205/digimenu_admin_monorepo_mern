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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilePenLine } from "lucide-react";
import { useParams } from "react-router-dom";
import {
  MenuitemWithCategorySchema,
  TUpdateMenuItem,
  TMenuItemWithCategory,
} from "@/features/menuitem/MenuItem.type";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getMenuCategories } from "@/features/menucategory/_reducer/menucategoryActions";
import { updateMenuItem } from "@/features/menuitem/_reducer/menuitemActions";

const MenuItemUpdateForm = ({
  initialValue,
}: {
  initialValue: TMenuItemWithCategory | null;
}) => {
  const { id: store_id } = useParams();
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.menucategory);

  useEffect(() => {
    dispatch(getMenuCategories(store_id as string));
  }, []);

  const form = useForm<z.infer<typeof MenuitemWithCategorySchema>>({
    resolver: zodResolver(MenuitemWithCategorySchema),
    defaultValues: {
      menucategory: {
        id:
          initialValue?.menucategory.id !== ""
            ? initialValue?.menucategory.id
            : "",
        name:
          initialValue?.menucategory.name !== ""
            ? initialValue?.menucategory.name
            : "",
      },
      name: initialValue?.name !== "" ? initialValue?.name : "",
      description:
        initialValue?.description !== "" ? initialValue?.description : "",
      img_url: initialValue?.img_url !== "" ? initialValue?.img_url : "",
      price: initialValue?.price ? initialValue?.price : "",
    },
  });

  async function onSubmit() {
    const formData: TUpdateMenuItem = {
      id: initialValue?.id ? initialValue?.id : ("" as string),
      menucategory: {
        id: form.getValues("menucategory.id")
          ? form.getValues("menucategory.id")
          : (initialValue?.menucategory.id as string),
        name: form.getValues("menucategory.name")
          ? form.getValues("menucategory.name")
          : (initialValue?.menucategory.name as string),
      },
      store_id: store_id as string,
      name: form.getValues("name")
        ? form.getValues("name")
        : (initialValue?.name as string),
      description: form.getValues("description")
        ? form.getValues("description")
        : (initialValue?.description as string),
      img_url: form.getValues("img_url")
        ? form.getValues("img_url")
        : (initialValue?.img_url as string),
      price: form.getValues("price")
        ? form.getValues("price")
        : initialValue!.price,
    };
    dispatch(updateMenuItem(formData));
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
          <DialogTitle>Chỉnh sửa thông tin sản phẩm</DialogTitle>
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
              name="menucategory.id"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Lựa chọn danh mục" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => {
                        return (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Tên sản phẩm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Mô tả sản phẩm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="img_url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Thêm link ảnh" {...field} />
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
                    <Input
                      type="number"
                      placeholder="Giá sản phẩm"
                      {...field}
                    />
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

export default MenuItemUpdateForm;
