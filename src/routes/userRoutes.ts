import { Router } from "express";
import { createUserProfile, updateUserProfile, deleteUserProfile, getUserProfile} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/profile/",authMiddleware, createUserProfile);  
router.get("/profile/",authMiddleware, getUserProfile);  
router.put("/profile/",authMiddleware, updateUserProfile);  
router.delete("/profile/",authMiddleware, deleteUserProfile);  


export default router;