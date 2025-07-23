import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FilePenLine } from "lucide-react";
import OptionItemCreateForm from "./OptionItemCreateForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useParams } from "react-router-dom";
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
import { useAppDispatch } from "@/redux/hook";
import {
  getOptionGroupByStore,
  updateOptionGroup,
} from "../_reducer/optiongroupActions";
import {
  OptionGroupSchema,
  TUpdateOptionGroup,
  TOptiongroupWithItems,
} from "../OptionGroup.type";

function OptionGroupUpdateForm({
  initialData,
}: {
  initialData: TUpdateOptionGroup;
}) {
  const { id: store_id } = useParams();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof OptionGroupSchema>>({
    resolver: zodResolver(OptionGroupSchema),
    defaultValues: {
      name: initialData.name ? initialData.name : "",
      can_have_many: initialData.can_have_many
        ? initialData.can_have_many
        : false,
    },
  });

  async function onSubmit() {
    const formData: TUpdateOptionGroup = {
      id: initialData.id,
      name: form.getValues("name") ? form.getValues("name") : initialData.name,
      can_have_many: form.getValues("can_have_many")
        ? form.getValues("can_have_many")
        : initialData.can_have_many,
    };
    dispatch(updateOptionGroup(formData));
    dispatch(getOptionGroupByStore(store_id as string));
    toast({
      title: "Thêm mới danh mục thành công",
      description: "Kiểm tra màn hình để xem thay đổi",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-3 my-3"
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
                <FormLabel className="text-base">Chọn nhiều lựa chọn</FormLabel>
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
        <Button type="submit">Cập nhật</Button>
      </form>
    </Form>
  );
}

const OptionGroupUpdateContainer = ({
  optiongroup,
}: {
  optiongroup: TOptiongroupWithItems;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <FilePenLine />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <div className="flex gap-3 items-center">
              <span className="text-xl">{optiongroup.name}</span>
              <p className={`opacity-60 text-sm`}>
                {optiongroup.can_have_many
                  ? `Tùy chọn, tối đa ${optiongroup.optionitem?.length}`
                  : "Chọn tối đa 1"}
              </p>
            </div>
          </SheetTitle>
          <Separator />
        </SheetHeader>
        <OptionGroupUpdateForm
          initialData={{
            id: optiongroup.id,
            name: optiongroup.name,
            can_have_many: optiongroup.can_have_many,
          }}
        />
        <div className={`my-3`}>
          <span className={`text-xl font-bold`}>Danh sách tùy chọn</span>
          {optiongroup.optionitem &&
            optiongroup.optionitem.map((item) => (
              <div
                key={item.id}
                className={`flex justify-between items-center gap-3 w-full`}
              >
                <span>{item.name}</span>
                <p>
                  {parseInt(item.price).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
            ))}
        </div>
        <OptionItemCreateForm option_group_id={optiongroup.id} />
      </SheetContent>
    </Sheet>
  );
};

export default OptionGroupUpdateContainer;
