import { useState, useEffect } from "react";
import supabaseClient from "@/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getMenuCategories } from "@/features/menucategory/_reducer/menucategoryActions";
import { createMenuItem } from "@/features/menuitem/_reducer/menuitemActions";
import {
  MenuitemWithCategorySchema,
  type TNewMenuItem,
} from "../MenuItem.type";

export default function MenuItemCreateForm() {
  const form = useForm<z.infer<typeof MenuitemWithCategorySchema>>({
    resolver: zodResolver(MenuitemWithCategorySchema),
    defaultValues: {
      menucategory: {
        id: "",
        name: "",
      },
      name: "",
      description: "",
      img_url: "",
      price: "",
    },
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const formData: TNewMenuItem = {
      store_id: store_id as string,
      menucategory: {
        id: form.getValues("menucategory.id"),
        name: categories.find(
          (category) => category.id === form.getValues("menucategory.id")
        )!.name,
      },
      name: form.getValues("name"),
      description: form.getValues("description"),
      img_url: form.getValues("img_url"),
      price: form.getValues("price"),
    };
    dispatch(createMenuItem(formData));
    console.log(formData);
    toast({
      title: "Thêm mới sản phẩm thành công",
      description: "Kiểm tra màn hình để xem thay đổi",
    });
  }

  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `menuitem_avatars/${fileName}`;

    try {
      setUploading(true);
      const { error: uploadError, data: uploadData } =
        await supabaseClient.storage
          .from("DigimenuStore")
          .upload(filePath, file);
      console.log(uploadData);
      form.setValue(
        "img_url",
        `https://qrupimnxoochpfjdumwk.supabase.co/storage/v1/object/public/${uploadData?.fullPath}`
      );

      if (uploadError) {
        throw new Error(`Error uploading file: ${uploadError.message}`);
      }

      alert("File uploaded successfully!");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const { id: store_id } = useParams();
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.menucategory);

  useEffect(() => {
    dispatch(getMenuCategories(store_id as string));
  }, []);

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Thêm sản phẩm mới</CardTitle>
        <CardDescription>Nhập thông tin chi tiết về sản phẩm</CardDescription>
      </CardHeader>
      <CardContent className="w-full mx-auto flex gap-6">
        <Card className="w-[420px] h-3/4 flex flex-col gap-4 justify-center p-3">
          {uploading && "Uploading ..."}
          <Label htmlFor="picture">Thêm hình ảnh</Label>
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              alt="file"
              className="object-scale-down h-[100px]"
            />
          ) : (
            <div className="flex justify-center items-center w-full mx-auto h-[100px] rounded-lg bg-gradient-to-tr from-gray-400 to-gray-200">
              Chưa chọn hình ảnh
            </div>
          )}
          <Input
            id="picture"
            type="file"
            placeholder="Chọn hình ảnh"
            onChange={handleFileChange}
            accept="image/*"
          />
          <Button disabled={!file} onClick={handleUpload}>
            Tải hình ảnh lên
          </Button>
        </Card>
        <Form {...form}>
          <form className="w-full">
            <FormField
              control={form.control}
              name="menucategory.id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Danh mục sản phẩm</FormLabel>
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
                  <FormLabel>Tên sản phẩm</FormLabel>
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
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Input placeholder="Sản phẩm" {...field} />
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
                  <FormLabel>Giá sản phẩm</FormLabel>
                  <FormControl>
                    <Input placeholder="80.000" {...field} />
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
                  <FormLabel>Hình ảnh</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="Đường dẫn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button onClick={onSubmit} type="submit" className="mt-3">
              Tạp sản phẩm mới
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
