import { Base as BaseType } from "@/Base.type";
import { z } from "zod";
import { TOptionItem } from "../optiongroup/OptionGroup.type";
import { MenuitemBaseSchema } from "../menuitem/MenuItem.type";

export const OrderPreviewSchema = z.object({
    total_price: z.number().finite().positive({
        message: "Total price must be a positive number"
    }),
    total_item: z.number().int().finite().positive({
        message: "Total item must be a positive number"
    }),
    note: z.string().optional(),
    is_take_away: z.boolean({
        message: "Is take away must be a boolean"
    }),
    payment_method: z.enum(["Cash", "Mobile_banking"], {
        message: "Payment method must be Cash or Mobile_banking"
    }),
    is_paid: z.boolean({
        message: "Is paid must be a boolean"
    }),
    status: z.enum(["Preparing", "Ordered", "Confirmed", "Finished"], {
        message: "Status must be Ordered, Confirmed or Finished"
    })
})

export const OrderPreviewItemSchema = MenuitemBaseSchema.extend({
    note: z.string().optional(),
    quantity: z.number().int().finite().positive({
        message: "Quantity must be a positive number"
    }),
    total_price: z.number().finite().positive({
        message: "Total price must be a positive number"
    }),
})

export type TOrderPreview = z.infer<typeof OrderPreviewSchema> & {
    user_id: string,
    store_id: string,
};

export type TOrderPreviewWithItems = TOrderPreview & {
    orderitem: TOrderPreviewItem[],
}

export type TOrderPreviewItem = z.infer<typeof OrderPreviewItemSchema> & BaseType & {
    orderitemoption: TOptionItem[]
};