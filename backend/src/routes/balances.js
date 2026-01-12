import express from "express";
import * as ctrl from "../controllers/balanceController.js";

const router = express.Router();

router.post("/", ctrl.createBalance);
router.get("/", ctrl.getBalances);
router.get("/supabase/:supabaseId", ctrl.getBalancesBySupabaseId);
router.get("/:id", ctrl.getBalanceById);
router.put("/:id", ctrl.updateBalance);
router.delete("/:id", ctrl.deleteBalance);

export default router;
