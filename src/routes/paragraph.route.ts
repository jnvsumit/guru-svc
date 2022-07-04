import {Router} from "express";
import ParagraphController from "../controllers/paragraph.controller";

const router = Router();

router.get("/", ParagraphController.getInstance().getParagraphById);
router.get("/list", ParagraphController.getInstance().getParagraphList);
router.post("/", ParagraphController.getInstance().postParagraph);
router.patch("/", ParagraphController.getInstance().updateParagraphById);

export default router;

