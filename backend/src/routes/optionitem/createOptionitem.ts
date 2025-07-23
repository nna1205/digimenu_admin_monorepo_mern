import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";
import redis from "../../redisClient";

const createOptionitem = asyncHandler(async (req: Request, res: Response) => {
    const { name, price, option_group_id } = req.body;

    const validName = z.string().parse(name);
    const validPrice = z.number().nonnegative().finite().parse(price);
    const validOptiongroupId = z.string().uuid({
        message: "Invalid UUID",
    }).parse(option_group_id);

    if (!validName || !validPrice || !validOptiongroupId) {
        res.status(400).json({ 
            status: "error",
            message: 'Invalid data',
            code: 400, 
        });
    }

    //check if the optiongroup already exists
    const existingOptiongroup = await prisma.optiongroup.findUnique({
        where: {
            id: validOptiongroupId,
        }
    }); 

    if (!existingOptiongroup) {
        res.status(404).json({ 
            status: "error",
            message: 'Optiongroup not found',
            code: 404, 
        });
    };

    const newOptionitem = await prisma.optionitem.create({
        data: {
            name: validName,
            price: validPrice,
            option_group_id: validOptiongroupId,
        },
    });

    redis.del(`store:${existingOptiongroup?.store_id}:optiongroups`);

    res.status(201).json({
        status: "success",
        message: "Optionitem created",
        data: newOptionitem,
    });
});

export default createOptionitem;