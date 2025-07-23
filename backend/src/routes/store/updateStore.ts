import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";

const updateStore = asyncHandler(async (req: Request, res: Response) => {
    const validId = z.string().uuid({
        message: "Invalid UUID",
    }).parse(req.query.store_id);
    const { name, description, img_url, address, phone_number, open_time, close_time } = req.body;
     
    const storeUpdateSchema = z.object({
        name: z.string().min(1).max(50).regex(/^[a-zA-Z0-9 ]+$/),
        description: z.string().min(1).max(500).regex(/^[a-zA-Z0-9 ]+$/),
        img_url: z.string().min(1),
        address: z.string().min(1),
        phone_number: z.string().min(1),
        open_time: z.string().min(1),
        close_time: z.string().min(1),
    });

    const storeUpdateData = storeUpdateSchema.safeParse(req.body);

    if (!storeUpdateData.success) {
        res.status(400).json({ error: storeUpdateData.error.message });
    };

    const existStore = await prisma.store.findUnique({
        where: {
            id: validId
        }
    });

    if (!existStore) {
        res.status(404).json({ error: "Store not found" });
    };

    const updatedStore = await prisma.store.update({
        where: {
            id: validId,
        },
        data: {
            name: name,
            description: description,
            img_url: img_url,
            address: address,
            phone_number: phone_number,
            open_time: open_time,
            close_time: close_time
        }
    });

    res.status(200).json({ 
        status: 201,
        message: "Store updated successfully", 
        data: updatedStore,
    });
});

export default updateStore;