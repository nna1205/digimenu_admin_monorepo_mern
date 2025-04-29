import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";
import redis from "../../redisClient";

const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    const validID = z.string().uuid({
        message: "Invalid UUID",
    }).parse(req.query.category_id);

    if (!validID) {
        res.status(400).json({ 
            status: "error",
            message: 'Invalid UUID',
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

    const deleteCategory = await prisma.menucategory.delete({
        where: {
            id: validID,
        }
    });

    //if new category is created, delete the cache for the old categories
    redis.del(`store:${req.body.storeid}:categories`);

    res.status(200).json({
        status: "success",
        message: "Category deleted successfully",
        data: deleteCategory,
    });
});

export default deleteCategory;