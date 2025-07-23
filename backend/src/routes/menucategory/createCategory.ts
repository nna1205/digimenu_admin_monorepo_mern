import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";
import redis from "../../redisClient";

const createCategory = asyncHandler(async (req: Request, res: Response) => {
    const { name, store_id } = req.body;
    const validName = z.string().parse(name);
    const validStoreID = z.string().uuid({
        message: "Invalid UUID",
    }).parse(store_id);

    if (!validName) {
        res.status(400).json({ 
            status: "error",
            message: 'Invalid name, only alphabets, numbers and space are allowed',
            code: 400, 
        });
    }

    //check if the category already exists
    const existingCategory = await prisma.menucategory.findUnique({
        where: {
            name: validName,
        }
    });

    if (existingCategory)  {
        res.status(400).json({ 
            status: "error",
            message: 'Category already exists',
            code: 400, 
        });
    };

    const newCategory = await prisma.menucategory.create({
        data: {
            store_id: validStoreID,
            name: validName,
        }
    });

    //if new category is created, delete the cache for the old categories
    redis.del(`store:${validStoreID}:categories`);

    res.status(201).json({
        status: "success",
        message: "Category created successfully",
        data: newCategory,
    });
});

export default createCategory;