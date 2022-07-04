import multer from 'multer';
import {Router} from "express";
import MediaController from "../controllers/media.controller";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

router.get("/", MediaController.getInstance().getMediaById);
router.get("/list", MediaController.getInstance().getMediaList);
router.post("/", upload.single("image"), MediaController.getInstance().postMedia);
router.patch("/", MediaController.getInstance().updateMediaById);

export default router;

