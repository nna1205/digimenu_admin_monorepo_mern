import { z } from "zod";
import { Base as BaseType } from "@/Base.type";

export const OptionGroupSchema = z.object({
    name: z.string().min(2, {
      message: "Option group name must be at least 2 characters.",
    }),
    can_have_many: z.boolean(),
});

export const OptionItemSchema = z.object({
    option_group_id: z.string().uuid({
        message: "Invalid ID",
    }),
    name: z.string().min(2, {
      message: "Option name must be at least 2 characters.",
    }),
    price: z.string().min(0, {
      message: "Invalid price",
    }),
})

export type TOptionGroup = z.infer<typeof OptionGroupSchema> & BaseType & {
  store_id: string,
};

export type TNewOptionGroup = z.infer<typeof OptionGroupSchema> & {
  store_id: string,
};

export type TUpdateOptionGroup = z.infer<typeof OptionGroupSchema> & {
  id: string,
};

export type TOptionItem = z.infer<typeof OptionItemSchema> & BaseType;

export type TNewOptionItem = z.infer<typeof OptionItemSchema>;

export type TOptiongroupWithItems = z.infer<typeof OptionGroupSchema> & BaseType & {
    optionitem: TOptionItem[];
};