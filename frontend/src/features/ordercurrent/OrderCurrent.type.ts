import { z } from "zod";
import { Base as BaseType } from "@/Base.type";
import { OrderPreviewSchema } from "@/features/orderhistory/OrderPreview.type";

export type TOrderStatusUpdate = z.infer<typeof OrderPreviewSchema> & BaseType & {
    user_id: string,
    store_id: string,
}