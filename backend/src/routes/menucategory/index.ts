import express, {Router} from "express";
import getAllCategoryByStore from "./getAllCategoryByStore";
import createCategory from "./createCategory";
import updateCategory from "./updateCategory";
import deleteCategory from "./deleteCategory";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";

const router: Router = express.Router();

router.get("/", getAllCategoryByStore);
router.get("/:category_id", asyncHandler(async (req, res) => {
    const validID = z.string().uuid({
        message: "Invalid UUID",
    }).parse(req.params.category_id);

    if (!validID) {
        res.status(400).json({ 
            status: "error",
            message: 'Invalid UUID',
            code: 400, 
        });
    }
    const dbResult = await prisma.menucategory.findUnique({
        where: {
            id: validID,
        },
        include: {
            _count: {
                select: {
                    menuitem: true,
                }
            }
        }
    })

    if (!dbResult) {
        res.status(404).json({ 
            status: "error",
            message: 'Record not found',
            code: 404, 
        });
    }

    res.status(200).json({
        status: "success",
        message: "Category retrieved successfully",
        data: dbResult,
    });
}));
router.post("/create", createCategory);
router.put("/update", updateCategory);
router.delete("/delete", deleteCategory);

export default router;