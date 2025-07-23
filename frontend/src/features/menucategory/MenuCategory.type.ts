import {Base as BaseType} from '@/Base.type';
import { z } from "zod";

export const Schema = z.object({
    store_id: z
    .string()
    .regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, {
      message: "Invalid store ID",
    }),
    name: z.string().min(2, {
      message: "Category name must be at least 2 characters.",
    }),
});

export type TNewMenuCategory = z.infer<typeof Schema>;

export type TUpdateMenuCategory = z.infer<typeof Schema> & {
    id: string,
};

export type TMenuCategory = z.infer<typeof Schema> & BaseType;

export type TMenuCategoryWithTotalItem = TMenuCategory & {
    _count: {
        menuitem: number,
    }
}