import express from "express";
import createOptionitem from "./createOptionitem";
import deleteOptionitem from "./deleteOptionitem";

const router = express.Router();
  
router.post("/create", createOptionitem);
router.delete("/delete", deleteOptionitem);

export default router;