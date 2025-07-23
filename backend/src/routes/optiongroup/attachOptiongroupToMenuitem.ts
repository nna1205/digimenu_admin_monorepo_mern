import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";

const attatchOptiongroupToMenuitem = asyncHandler(async (req: Request, res: Response) => {
    const { menu_item_id, option_group_id } = req.body;

    const existMenuitem = await prisma.menuitem.findUnique({
        where: {
            id: menu_item_id,
        },
    });

    if (!existMenuitem) {
        res.status(400).json({ 
            status: "error", 
            message: "Menuitem not found", 
            code: 400,
        });
    }

    // const existOptiongroup = await prisma.optiongroup.findUnique({
    //     where: {
    //         id: option_group_id,
    //     },
    // });

    // if (!existOptiongroup) {
    //     res.status(400).json({
    //         status: "error",
    //         message: "Optiongroup not found",
    //         code: 400,
    //     });
    // }

    //Because option_group_id is a array of string
    //we need to use prisma.menuitemoption.createMany
    const result = await prisma.menuitemoption.createMany({
        data: option_group_id.map((item: string) => ({
            menu_item_id: menu_item_id,
            option_group_id: item,
        })),
    })

    res.status(200).json({
        status: "success",
        message: "Optiongroup attached successfully",
        data: result,
    });
});

export default attatchOptiongroupToMenuitem;