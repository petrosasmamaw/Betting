import express from "express";
import * as ctrl from "../controllers/betController.js";

const router = express.Router();

router.post("/", ctrl.createBet);
router.get("/", ctrl.getBets);
router.get("/supabase/:supabaseId", ctrl.getBetsBySupabaseId);
router.get("/:id", ctrl.getBetById);
router.put("/:id", ctrl.updateBet);
router.delete("/:id", ctrl.deleteBet);

export default router;
