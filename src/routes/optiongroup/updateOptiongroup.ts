import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";
import redis from "../../redisClient";

const updateOptiongroup = asyncHandler(async (req: Request, res: Response) => {
    const { name, can_have_many, id } = req.body;
    const validId = z.string().uuid({
        message: "Invalid UUID",
    }).parse(id);
    const validName = z.string().parse(name);
    const validCanHaveMany = z.boolean().parse(can_have_many);

    if (!validId || !validName || !validCanHaveMany) {
        res.status(400).json({ 
            status: "error",
            message: "Invalid input", 
            code: 400,
        });
    }

    //check if the optiongroup exists
    const optiongroup = await prisma.optiongroup.findUnique({
        where: {
            id: validId,
        },
    });

    if (!optiongroup) { 
        res.status(404).json({ 
            status: "error",
            message: "Optiongroup not found",
            code: 404,
        });
    }

    //check if name is unique
    const existingOptiongroup = await prisma.optiongroup.findUnique({
        where: {
            name: name,
        },
    });

    if (existingOptiongroup) {
        res.status(400).json({ 
            status: "error", 
            message: "Optiongroup name already exists", 
            code: 400 
        });
    }

    const newOptiongroup = await prisma.optiongroup.update({
        where: {
            id: validId,
        },
        data: {
            name: validName,
            can_have_many: validCanHaveMany,
        },
    });

    redis.del(`store:${existingOptiongroup?.store_id}:optiongroups`);

    res.status(200).json({
        status: "success",
        message: "Optiongroup updated successfully",
        data: newOptiongroup,
    });
});

export default updateOptiongroup;