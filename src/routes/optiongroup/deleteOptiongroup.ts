import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";
import redis from "../../redisClient";

const deleteOptiongroup = asyncHandler(async (req: Request, res: Response) => {
    const validID = z.string().uuid({
        message: "Invalid ID",
    }).parse(req.query.option_group_id);
    if (!validID) {
        res.status(400).json({
            status: "error", 
            message: "Invalid ID",
            code: 400, 
        });
    }

    //check if optiongroup exists
    const optiongroup = await prisma.optiongroup.findUnique({
        where: {
            id: validID,
        },
    });

    if (!optiongroup) {
        res.status(404).json({ 
            status: "error", 
            message: "Optiongroup not found", 
            code: 404 
        });
    }

    const deleteOptiongroup = await prisma.optiongroup.delete({
        where: {
            id: validID,
        },
    });

    redis.del(`store:${optiongroup?.store_id}:optiongroups`);

    res.status(200).json({
        status: "success",
        message: "Optiongroup deleted successfully",
        data: deleteOptiongroup,
    });
});

export default deleteOptiongroup;