import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";

const getOrderHistoryByStore = asyncHandler(async (req: Request, res: Response) => {
    const validID = z.string().uuid({
        message: "Invalid UUID",
    }).parse(req.query.store_id);

    if (!validID) {
        res.status(400).json({
            status: "error",
            message: "Invalid UUID",
            code: 400,
        });
    }

    const existingStore = await prisma.store.findUnique({
        where: {
            id: validID,
        }
    });

    if (!existingStore) {
        res.status(404).json({
            status: "error",
            message: "Store not found",
            code: 404,
        });
    }

    const dbResult = await prisma.ordermenu.findMany({
        where: {
            store_id: validID,
            status: "Finished",
        },
        orderBy: {
            created_at: "desc",
        },
        include: {
            orderitem: {
                include: {
                    menuitem: true,
                    orderitemoption: {
                        include: {
                            optionitem: true,
                        }
                    }
                }
            }
        },
    });

    if (!dbResult) {
        res.status(404).json({
            status: "error",
            message: "No orders found",
            code: 404,
        });
    }

    res.status(200).json({
        status: "success",
        message: "Order history retrieved successfully",
        data: dbResult,
    });
});

export default getOrderHistoryByStore;