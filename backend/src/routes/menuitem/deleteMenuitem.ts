import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";
import redis from "../../redisClient";

const deleteMenuitem = asyncHandler(async (req: Request, res: Response) => {
    const validID = z.string().uuid({
        message: "Invalid UUID",
    }).parse(req.query.item_id);

    if (!validID) {
        res.status(400).json({ 
            status: "error",
            message: 'Invalid UUID',
            code: 400, 
        });
    }

    //check if the menuitem already exists
    const existingMenuitem = await prisma.menuitem.findUnique({
        where: {
            id: validID,
        }
    });

    if (!existingMenuitem) {
        res.status(404).json({ 
            status: "error",
            message: 'Menuitem not found',
            code: 404, 
        });
    }      
    
    const deleteMenuitem = await prisma.menuitem.delete({
        where: {
            id: validID,
        }
    });

    //if new menuitem is created, delete the cache for the old menuitems
    redis.del(`store:${req.body.store_id}:items`);

    res.status(200).json({
        status: "success",
        messge: "Menuitem deleted successfully",
        data: deleteMenuitem,
    });
});

export default deleteMenuitem;