import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";

const getAllOptiongroupByItem = asyncHandler(async (req: Request, res: Response) => {
    const validItemID = z.string().uuid({
        message: "Item ID is not valid",
    }).parse(req.query.item_id);
    
    if (!validItemID) {
        res.status(400).json({
            status: "error",
            message: "Item ID is not valid",
            code: 400,
        });
    }

    const existingMenuitem = await prisma.menuitem.findUnique({
        where: {
            id: validItemID,
        }
    });

    if (!existingMenuitem) {
        res.status(400).json({
            status: "error",
            message: "Item ID is not valid",
            code: 400,
        });
    }

    const dbResult = await prisma.menuitem.findUnique({
        where: {
            id: validItemID,
        },
        select: {
            id: true, 
            name: true,
            description: true,
            price: true,
            img_url: true,
            created_at: true,
            updated_at: true,
            menucategory: {
                select: {
                    id: true,
                    name: true,
                }
            },
            menuitemoption: true,
        },
    });

    if (!dbResult) {
        res.status(400).json({
            status: "error",
            message: "Item ID is not valid",
            code: 400,
        });
    }

    res.status(200).json({
        status: "success",
        message: "Item retrieved successfully",
        data: dbResult,
    });
});

export default getAllOptiongroupByItem;