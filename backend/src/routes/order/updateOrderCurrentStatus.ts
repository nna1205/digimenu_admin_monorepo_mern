import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";
// import redis from "../../redisClient";

const updateOrderCurrentStatus = asyncHandler(async (req: Request, res: Response) => {
    const validID = z.string().uuid({
        message: "Invalid UUID",
    }).parse(req.query.order_id);

    const validStatus = z.enum(["Ordered", "Confirmed", "Preparing", "Finished"], {
        message: "Invalid status",
    }).parse(req.body.status);

    if (!validID) {
        res.status(400).json({
            status: "error",
            message: "Invalid UUID",
            code: 400,
        });
    }

    if (!validStatus) {
        res.status(400).json({
            status: "error",
            message: "Invalid status",
            code: 400,
        });
    }

    const existingOrder = await prisma.ordermenu.findUnique({
        where: {
            id: validID,
        }
    });

    if (!existingOrder) {
        res.status(404).json({
            status: "error",
            message: "Order not found",
            code: 404,
        });
    }

    const dbResult = await prisma.ordermenu.update({
        where: {
            id: validID,
        },
        data: {
            status: validStatus,
        },
    });

    if (!dbResult) {
        res.status(404).json({
            status: "error",
            message: "Order not found",
            code: 404,
        });
    }

    res.status(200).json({
        status: "success",
        message: "Order status updated successfully",
        data: dbResult,
    });
});

export default updateOrderCurrentStatus;