import express from "express";
import { UserController } from "../controller/UserController.js";
import { OccasionController } from "../controller/OccasionController.js";

const router = express.Router();

router.post("/addUser", UserController.addUser);
router.post("/findUser", UserController.findUser);
router.post("/saveOccasion", OccasionController.saveOccasion);
router.post("/findOccasions", OccasionController.findOccasions);
router.put("/deleteOccasion", OccasionController.deleteOccasion);
// router.get("/message/get/:id", MessageController.getMessages);
// router.post('/file/upload',upload.single("file"),ImageController.uploadFile);
export default router;
