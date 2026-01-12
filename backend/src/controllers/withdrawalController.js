import Withdrawal from "../models/Withdrawal.js";

export const createWithdrawal = async (req, res) => {
  const w = await Withdrawal.create(req.body);
  res.status(201).json(w);
};

export const getWithdrawals = async (req, res) => {
  const list = await Withdrawal.find();
  res.json(list);
};

export const getWithdrawalsBySupabaseId = async (req, res) => {
  const { supabaseId } = req.params;
  const list = await Withdrawal.find({ supabaseId });
  res.json(list);
};

export const getWithdrawalById = async (req, res) => {
  const w = await Withdrawal.findById(req.params.id);
  if (!w) return res.status(404).json({ message: "Withdrawal not found" });
  res.json(w);
};

export const updateWithdrawal = async (req, res) => {
  const w = await Withdrawal.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!w) return res.status(404).json({ message: "Withdrawal not found" });
  res.json(w);
};

export const deleteWithdrawal = async (req, res) => {
  const w = await Withdrawal.findByIdAndDelete(req.params.id);
  if (!w) return res.status(404).json({ message: "Withdrawal not found" });
  res.json({ message: "Withdrawal deleted" });
};
