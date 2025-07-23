import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";
import redis from "../../redisClient";

const updateCategory = asyncHandler(async (req: Request, res: Response) => {
    const { id, name, store_id } = req.body;
    const validID = z.string().uuid({
        message: "Invalid UUID",
    }).parse(id);
    const validName = z.string().parse(name);

    if (!validID || !validName) {
        res.status(400).json({ 
            status: "error",
            message: 'Invalid name or ID, only alphabets, numbers and space are allowed',
            code: 400, 
        });
    }

    //check if the category already exists
    const existingCategory = await prisma.menucategory.findUnique({
        where: {
            id: validID,
        }
    });

    if (!existingCategory) {
        res.status(404).json({ 
            status: "error",
            message: 'Category not found',
            code: 404, 
        });
    };

    const updateCategory = await prisma.menucategory.update({
        where: {
            id: validID,
        },
        data: {
            name: validName,
        }
    });

    //if new category is created, delete the cache for the old categories
    redis.del(`store:${store_id}:categories`);

    res.status(200).json({
        status: "success",
        message: "Category updated successfully",
        data: updateCategory,
    });
});

export default updateCategory;