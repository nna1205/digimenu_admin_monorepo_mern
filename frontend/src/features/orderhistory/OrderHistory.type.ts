import { Base as BaseType } from "@/Base.type";
import { z } from "zod";
import { OrderPreviewSchema, OrderPreviewItemSchema } from "./OrderPreview.type";
import { TMenuItemBase } from "../menuitem/MenuItem.type";
import { TOptionItem } from "../optiongroup/OptionGroup.type";

export type TOrder = z.infer<typeof OrderPreviewSchema> & BaseType & {
    user_id: string,
    store_id: string,
    orderitem: TOrderItem[];
};

export const OrderitemSchema = OrderPreviewItemSchema.extend({
    order_id: z.string().uuid({
        message: "Invalid ID",
    }),
    menu_item_id: z.string().uuid({
        message: "Invalid ID",
    }),
})

export type TOrderItem = z.infer<typeof OrderitemSchema> & BaseType & {
    menuitem: TMenuItemBase,
    orderitemoption: TOrderItemOption[]
};

export type TOrderItemOption = BaseType & {
    order_item_id: string,
    menu_item_option_id: string,
    optionitem: TOptionItem,
}