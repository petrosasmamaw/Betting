import express from "express";
import * as ctrl from "../controllers/depositController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Create deposit with optional single image (field name: "image")
router.post("/", upload.single("image"), ctrl.createDeposit);
router.get("/", ctrl.getDeposits);
router.get("/supabase/:supabaseId", ctrl.getDepositsBySupabaseId);
router.get("/:id", ctrl.getDepositById);
// Update deposit; if a new image file is sent it will replace the existing image
router.put("/:id", upload.single("image"), ctrl.updateDeposit);
router.delete("/:id", ctrl.deleteDeposit);

export default router;
