import {Router} from "express";
import LonginController from "../controllers/auth.controller";

const router = Router();

router.post("/login", LonginController.getInstance().login);
router.post("/logout", LonginController.getInstance().logout);

export default router;