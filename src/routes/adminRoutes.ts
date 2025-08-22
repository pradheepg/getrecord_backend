
import express from "express";
import { adminSignup, adminLogin ,getUsers} from "../controllers/adminController";
import { verifyAdminToken } from "../middleware/adminMiddleware";

const router = express.Router();

router.post("/signup", adminSignup);
router.get("/login", adminLogin);
router.get("/users/", verifyAdminToken, getUsers);

export default router;
