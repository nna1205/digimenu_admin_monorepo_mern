import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import prisma from "../../prismaClient";
import redis from "../../redisClient";

const createOptiongroup = asyncHandler(async (req: Request, res: Response) => {
  const { name, can_have_many, store_id } = req.body;
  const validName = z.string().parse(name);
  const validCanHaveMany = z.boolean().parse(can_have_many);
  const validStoreId = z.string().uuid({
    message: "Invalid store id",
  }).parse(store_id);

  if (!validStoreId || !validName || !validCanHaveMany) {
    res.status(400).json({ 
        status: 400,
        message: "Invalid input",
        error:   "Invalid input" 
    });
  }

  //check if the store exists
  const store = await prisma.store.findUnique({
    where: {
      id: store_id,
    },
  });

  //check if name is unique
  const optiongroup = await prisma.optiongroup.findUnique({
    where: {
      name: name,
    },
  });

  if (optiongroup) {
    res.status(400).json({
        status: "error", 
        message: "Optiongroup name already exists",
        code: 400, 
    });
  }

  if (!store) {
    res.status(400).json({ 
        status: "error", 
        message: "Store not found",
        code: 400,
    });
  }

  const newOptiongroup = await prisma.optiongroup.create({
    data: {
        name: validName,
        store_id: validStoreId,
        can_have_many: validCanHaveMany,
    },
  });

  redis.del(`store:${validStoreId}:optiongroups`);

  res.status(201).json({
    status: "success",
    message: "Optiongroup created successfully",
    data: newOptiongroup,
  })
});

export default createOptiongroup;