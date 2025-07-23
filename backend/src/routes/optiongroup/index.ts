import express from "express";
import getAllOptiongroupByStore from "./getAllOptiongroupByStore";
import getAllOptiongroupByItem from "./getAllOptiongroupByItem";
import createOptiongroup from "./createOptiongroup";
import updateOptiongroup from "./updateOptiongroup";
import deleteOptiongroup from "./deleteOptiongroup";
import attachOptiongroupToMenuitem from "./attachOptiongroupToMenuitem";

const router = express.Router();
  
router.get("/", getAllOptiongroupByStore);
router.get("/menuitem", getAllOptiongroupByItem);
router.post("/create", createOptiongroup);
router.put("/update", updateOptiongroup);
router.delete("/delete", deleteOptiongroup);
router.post("/attach", attachOptiongroupToMenuitem);

export default router;