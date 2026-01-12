import Balance from "../models/Balance.js";

export const createBalance = async (req, res) => {
  const b = await Balance.create(req.body);
  res.status(201).json(b);
};
export const getBalances = async (req, res) => {
  const list = await Balance.find();
  res.json(list);
};

export const getBalancesBySupabaseId = async (req, res) => {
  const { supabaseId } = req.params;
  const list = await Balance.find({ supabaseId });
  res.json(list);
};

export const getBalanceById = async (req, res) => {
  const b = await Balance.findById(req.params.id);
  if (!b) return res.status(404).json({ message: "Balance not found" });
  res.json(b);
};

export const updateBalance = async (req, res) => {
  const b = await Balance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!b) return res.status(404).json({ message: "Balance not found" });
  res.json(b);
};

export const deleteBalance = async (req, res) => {
  const b = await Balance.findByIdAndDelete(req.params.id);
  if (!b) return res.status(404).json({ message: "Balance not found" });
  res.json({ message: "Balance deleted" });
};
