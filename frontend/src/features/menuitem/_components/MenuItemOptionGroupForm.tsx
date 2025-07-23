import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Blocks } from "lucide-react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TMenuItemWithOptionGroup } from "../MenuItem.type";
import { useState, useEffect } from "react";
import { getOptionGroupByStore } from "@/features/optiongroup/_reducer/optiongroupActions";

const FormSchema = z.object({
  menu_item_id: z.string().uuid({
    message: "Invalid ID",
  }),
  option_group_id: z.array(
    z.string().uuid({
      message: "Invalid ID",
    })
  ),
});

const MenuItemOptionForm = ({
  initialData,
}: {
  initialData: TMenuItemWithOptionGroup;
}) => {
  const { id: store_id } = useParams();
  const dispatch = useAppDispatch();
  const { optiongroup } = useAppSelector((state) => state.optiongroup);

  useEffect(() => {
    dispatch(getOptionGroupByStore(store_id as string));
  }, [optiongroup]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      menu_item_id: initialData.id,
      option_group_id: initialData.menuitemoption.map(
        (item) => item.option_group_id
      ),
    },
  });

  async function onSubmit() {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          menu_item_id: form.getValues("menu_item_id"),
          option_group_id: form.getValues("option_group_id"),
        }),
      };
      const response = await fetch(
        `http://localhost:3000/api/v1/optiongroup/attach`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      console.log({
        menu_item_id: form.getValues("menu_item_id"),
        option_group_id: form.getValues("option_group_id"),
      });
      toast({
        title: "Thêm lựa chọn cho sản phẩm thành công",
        description: "Kiểm tra để xem thay đổi",
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {initialData.menuitemoption.length < 0 ? null : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="option_group_id"
              render={() => (
                <FormItem>
                  {optiongroup.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="option_group_id"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.name}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Cập nhật</Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export function MenuItemOptionContainer({ item_id }: { item_id: string }) {
  const [itemoptiongroup, setItemOptionGroup] =
    useState<TMenuItemWithOptionGroup>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getItemOptionGroup = async (item_id: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/optiongroup/menuitem?item_id=${item_id}`
      );
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const result = await response.json();
      setItemOptionGroup(result.data);
    } catch (err) {
      setError("Error fetching store detail: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getItemOptionGroup(item_id);
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <Blocks />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm lựa chọn cho sản phẩm</DialogTitle>
          <DialogDescription>Chọn tất cả nhóm bạn muốn thêm</DialogDescription>
        </DialogHeader>
        {isLoading ? <p>Loading...</p> : null}
        {itemoptiongroup && (
          <MenuItemOptionForm initialData={itemoptiongroup} />
        )}
      </DialogContent>
    </Dialog>
  );
}
