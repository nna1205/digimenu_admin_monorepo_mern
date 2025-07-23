import { Base as BaseType } from "@/Base.type";
import { z } from "zod";

export const MenuitemBaseSchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  description: z.string().max(255, {
    message: "Description must not exceed 255 characters",
  }),
  img_url: z.string().max(255, {
    message: "Image URL must not exceed 255 characters",
  }),
  price: z.string().min(5, {
    message: "Invalid price",
  }),
});

export const MenuitemWithCategorySchema = MenuitemBaseSchema.extend({
    menucategory: z.object({
        id: z.string().uuid({
            message: "Invalid ID",
        }),
        name: z.string().min(2, {
          message: "Category name must be at least 2 characters.",
        }),
    })
})

export const MenuitemWithOptionGroupSchema = MenuitemWithCategorySchema.extend({
    menuitemoption: z.array(z.object({
        menu_item_id: z.string().uuid({
            message: "Invalid ID",
        }),
        option_group_id: z.string().uuid({
          message: "Category name must be at least 2 characters.",
        }),
    }))
})

export type TMenuItemWithOptionGroup = z.infer<typeof MenuitemWithOptionGroupSchema> & BaseType;

export type TMenuItemWithCategory = z.infer<typeof MenuitemWithCategorySchema> & BaseType;

export type TMenuItemBase = z.infer<typeof MenuitemBaseSchema> & BaseType;

export type TNewMenuItem = z.infer<typeof MenuitemWithCategorySchema> & {
  store_id: string,
};

export type TUpdateMenuItem = z.infer<typeof MenuitemWithCategorySchema> & {
    id: string,
    store_id: string,
}