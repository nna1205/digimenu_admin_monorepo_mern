import { z } from "zod";
import { Base as BaseType } from "@/Base.type";

export const Schema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Store name must be at least 2 characters.",
    })
    .optional(),
    user_id: z.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, {
      message: "Invalid store ID",
    }),
  description: z
    .string()
    .max(255, {
      message: "Store description must not be more than 255 characters",
    })
    .optional(),
  address: z
    .string()
    .min(2, {
      message: "Store address must be at least 2 characters.",
    })
    .optional(),
  phone_number: z
    .string()
    .regex(/^0\d{9}$/, {
      message: "Invalid Vietnamese phone number",
    })
    .optional(),
  img_url: z
    .string()
    .max(255, {
      message: "Store description must not be more than 255 characters",
    })
    .optional(),
  open_time: z
    .string()
    .regex(/^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/, {
      message: "Invalid time format 09:00",
    }),
  close_time: z
    .string()
    .regex(/^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/, {
      message: "Invalid time format 09:00",
    })
});

export type TStore = z.infer<typeof Schema> & BaseType;

export type TNewStore = z.infer<typeof Schema>;

export type TUpdateStore = z.infer<typeof Schema> & {
    id: string,
};