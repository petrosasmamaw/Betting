import express from "express";
import * as ctrl from "../controllers/withdrawalController.js";

const router = express.Router();

router.post("/", ctrl.createWithdrawal);
router.get("/", ctrl.getWithdrawals);
router.get("/supabase/:supabaseId", ctrl.getWithdrawalsBySupabaseId);
router.get("/:id", ctrl.getWithdrawalById);
router.put("/:id", ctrl.updateWithdrawal);
router.delete("/:id", ctrl.deleteWithdrawal);

export default router;
