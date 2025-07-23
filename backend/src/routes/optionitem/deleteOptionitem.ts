import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";

const deleteOptionitem = asyncHandler(async (req: Request, res: Response) => {
    const validID = z.string().uuid({
        message: "Invalid UUID",
    }).parse(req.params.id);

    if (!validID) {
        res.status(400).json({ 
            status: "error",
            message: 'Invalid data',
            code: 400, 
        });
    }

    const existingOptionitem = await prisma.optionitem.findUnique({
        where: {
            id: validID,
        }
    });

    if (!existingOptionitem) {
        res.status(404).json({ 
            status: "error",
            message: 'Optionitem not found',
            code: 404, 
        });
    };

    const deleteOptionitem = await prisma.optionitem.delete({
        where: {
            id: validID,
        }
    });

    res.status(200).json({
        status: "success",
        message: "Optionitem deleted",
        data: deleteOptionitem,
    });
});

export default deleteOptionitem;