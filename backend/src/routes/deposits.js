import express from "express";
import * as ctrl from "../controllers/depositController.js";

const router = express.Router();

router.post("/", ctrl.createDeposit);
router.get("/", ctrl.getDeposits);
router.get("/supabase/:supabaseId", ctrl.getDepositsBySupabaseId);
router.get("/:id", ctrl.getDepositById);
router.put("/:id", ctrl.updateDeposit);
router.delete("/:id", ctrl.deleteDeposit);

export default router;
