import express from "express";
import * as ctrl from "../controllers/betController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Create bet with 1-5 uploaded images (field name: "images")
router.post("/", upload.array("images", 5), ctrl.createBet);
router.get("/", ctrl.getBets);
router.get("/supabase/:supabaseId", ctrl.getBetsBySupabaseId);
router.get("/:id", ctrl.getBetById);
// Optionally update images as well; if no files are sent, existing images remain
router.put("/:id", upload.array("images", 5), ctrl.updateBet);
router.delete("/:id", ctrl.deleteBet);

export default router;
