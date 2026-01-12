import Deposit from "../models/Deposit.js";

export const createDeposit = async (req, res) => {
  const deposit = await Deposit.create(req.body);
  res.status(201).json(deposit);
};

export const getDeposits = async (req, res) => {
  const deposits = await Deposit.find();
  res.json(deposits);
};

export const getDepositsBySupabaseId = async (req, res) => {
  const { supabaseId } = req.params;
  const deposits = await Deposit.find({ supabaseId });
  res.json(deposits);
};

export const getDepositById = async (req, res) => {
  const deposit = await Deposit.findById(req.params.id);
  if (!deposit) return res.status(404).json({ message: "Deposit not found" });
  res.json(deposit);
};

export const updateDeposit = async (req, res) => {
  const deposit = await Deposit.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!deposit) return res.status(404).json({ message: "Deposit not found" });
  res.json(deposit);
};

export const deleteDeposit = async (req, res) => {
  const deposit = await Deposit.findByIdAndDelete(req.params.id);
  if (!deposit) return res.status(404).json({ message: "Deposit not found" });
  res.json({ message: "Deposit deleted" });
};
