import { Router, Request, Response } from "express";
import config from "../config";
import MediaRoute from "./media.route";
import AuthRoute from "./auth.route";

const router = Router();

router.get("/", (req: Request, res: Response)=>{
   return res.status(200).json({
    version: "1.0.0",
    app: config.APP
   }) 
});


router.use("/auth", AuthRoute);
router.use("/media", MediaRoute);
export default router;