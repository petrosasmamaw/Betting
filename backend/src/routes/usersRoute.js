import express from "express";
import * as ctrl from "../controllers/userController.js";

const router = express.Router();

router.post("/", ctrl.createUser);
router.get("/", ctrl.getUsers);
router.get("/supabase/:supabaseId", ctrl.getUserBySupabaseId);
router.get("/:id", ctrl.getUserById);
router.put("/:id", ctrl.updateUser);
router.delete("/:id", ctrl.deleteUser);

export default router;
