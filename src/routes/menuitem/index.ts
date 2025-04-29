import express, {Router} from "express";
import getAllMenuitemByStore from "./getAllMenuitemByStore";
import createMenuitem from "./createMenuitem";
import updateMenuitem from "./updateMenuitem";
import deleteMenuitem from "./deleteMenuitem";

const router: Router = express.Router();

router.get("/", getAllMenuitemByStore);
router.post("/create", createMenuitem);
router.put("/update", updateMenuitem);
router.delete("/delete", deleteMenuitem);

export default router;