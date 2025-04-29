import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";
import redis from "../../redisClient";

const updateMenuitem = asyncHandler(async (req: Request, res: Response) => {
    const validId = z.string().uuid({
        message: "Invalid UUID",
    }).parse(req.query.item_id);
    const { name, price, description, img_url, category_id, store_id} = req.body;

    const validName = z.string().min(1).max(50).parse(name);
    const validPrice = z.number().nonnegative().finite().parse(price);
    const validCategoryId = z.string().uuid({
        message: "Invalid UUID",
    }).parse(category_id);
    const validStoreId = z.string().uuid({
        message: "Invalid UUID",
    }).parse(store_id);

    if (!validId || !validName || !validPrice || !validCategoryId || !validStoreId) {
        res.status(400).json({ 
            status: "error",
            message: 'Invalid data',
            code: 400, 
        });
    }

    //check if the category already exists
    const existingCategory = await prisma.menucategory.findUnique({
        where: {
            id: validCategoryId,
        }
    });

    if (!existingCategory) {
        res.status(404).json({ 
            status: "error",
            message: 'Category not found',
            code: 404, 
        });
    };

    const updateMenuItem = await prisma.menuitem.update({
        where: {
            id: validId,
        },
        data: {
            name: validName,
            price: validPrice,
            description: description,
            img_url: img_url,
            menu_category_id: validCategoryId,   
        }
    });

    redis.del(`store:${validStoreId}:items`);

    res.status(200).json({  
        status: "success",
        message: 'Menuitem updated successfully',
        data: updateMenuItem,
    });
});

export default updateMenuitem;