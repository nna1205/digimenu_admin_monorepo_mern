import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilePenLine } from "lucide-react";
import { useParams } from "react-router-dom";
import { Schema, TNewStore, TUpdateStore, TStore } from "../Store.type";
import { useAuth } from "@clerk/clerk-react";
import { z } from "zod";

const StoreUpdateForm = ({ initialValue }: { initialValue: TStore }) => {
  const { toast } = useToast();
  const { id: storeID } = useParams();
  const user = useAuth();

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: initialValue?.name !== "" ? initialValue?.name : "",
      description:
        initialValue?.description !== "" ? initialValue?.description : "",
      address: initialValue?.address !== "" ? initialValue?.address : "",
      phone_number:
        initialValue?.phone_number !== "" ? initialValue?.phone_number : "",
      img_url: initialValue?.img_url !== "" ? initialValue?.img_url : "",
      open_time: initialValue?.open_time !== "" ? initialValue?.open_time : "",
      close_time:
        initialValue?.close_time !== "" ? initialValue?.close_time : "",
    },
  });

  async function onSubmit(data: TNewStore) {
    const formData: TUpdateStore = {
      id: storeID as string,
      user_id: user?.userId as string,
      name: data.name ? data.name : (initialValue?.name as string),
      description: data.description
        ? data.description
        : (initialValue?.description as string),
      phone_number: data.phone_number
        ? data.phone_number
        : (initialValue?.phone_number as string),
      img_url: initialValue?.img_url ? initialValue?.img_url : "",
      address: data.address ? data.address : (initialValue?.address as string),
      open_time: data.open_time
        ? data.open_time
        : (initialValue?.open_time as string),
      close_time: data.close_time
        ? data.close_time
        : (initialValue?.close_time as string),
    };

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData, null, 2),
    };
    const response = await fetch(
      `http://localhost:3000/api/v1/store/update`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    // console.log(response.json());
    toast({
      title: "Cập nhật thông tin thành công",
      description: "Kiểm tra thông tin ở trang chủ",
    });
  }
  return (
    <Sheet>
      <SheetTrigger
        className={`flex justify-center items-center text-sm gap-1`}
      >
        <FilePenLine /> Sửa
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Chỉnh sửa thông tin cửa hàng</SheetTitle>
          <SheetDescription>
            Cập nhật thông tin cần chỉnh sửa. Các thông tin còn lại sẽ được giữ
            nguyên
          </SheetDescription>
        </SheetHeader>
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your store's name" {...field} />
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your store's description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your store's address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your store's phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={`w-full flex justify-between items-center gap-6`}>
              <FormField
                control={form.control}
                name="open_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Open time</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your store's open time"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="close_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Close time</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your store's address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit" className={`w-full`}>
                  Cập nhật
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default StoreUpdateForm;
