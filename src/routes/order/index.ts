import express from "express";
import createOrder from "./createOrder";
import getOrderHistoryByStore from "./getOrderHistoryByStore";
import getOrderCurrentByStore from "./getOrderCurrentByStore";
import updateOrderCurrentStatus from "./updateOrderCurrentStatus";

const router = express.Router();

router.post("/create", createOrder);
router.get("/history/store", getOrderHistoryByStore);
router.get("/current/store", getOrderCurrentByStore);
router.put("/current/update", updateOrderCurrentStatus);

export default router;