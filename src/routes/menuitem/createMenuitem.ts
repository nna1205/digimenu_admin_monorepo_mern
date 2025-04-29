import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";
import redis from "../../redisClient";

const createMenuitem = asyncHandler(async (req: Request, res: Response) => {
    const { name, price, description, img_url, menucategory, store_id} = req.body;

    const validName = z.string().min(1).max(100, {
        message: "Invalid name",
    }).parse(name);
    const validCategoryId = z.string().uuid({
        message: "Invalid UUID",
    }).parse(menucategory.id);
    const validStoreId = z.string().uuid({
        message: "Invalid UUID",
    }).parse(store_id);
    const validPrice = typeof(price) === "string" ? parseFloat(price) : price;

    if (!validName || !validCategoryId || !validStoreId) {
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
        return;
    };

    //check if the name already exists
    const existingName = await prisma.menuitem.findUnique({
        where: {
            name: validName,
        }
    });

    if (existingName) {
        res.status(400).json({ 
            status: "error",
            message: 'Name already exists',
            code: 400, 
        });
        return;
    };

    const newMenuitem = await prisma.menuitem.create({
        data: {
            name: validName,
            price: validPrice,
            description: description,
            img_url: img_url,
            menu_category_id: validCategoryId,
        },
    });

    //if new menuitem is created, delete the cache for the old menuitems
    redis.del(`store:${validStoreId}:items`);

    res.status(201).json({
        status: "success",
        message: "Menuitem created successfully",
        data: newMenuitem,
    });
});

export default createMenuitem;