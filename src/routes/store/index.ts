import express from "express";
import getStoreDetail from "./getStoreDetail";
import updateStore from "./updateStore";

const router = express.Router();

router.get("/:id", getStoreDetail);
router.put("/update", updateStore);

export default router;