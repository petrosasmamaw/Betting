import Deposit from "../models/Deposit.js";

export const createDeposit = async (req, res) => {
  try {
    const imageUrl = req.file?.path;

    const depositData = {
      supabaseId: req.body.supabaseId,
      phoneNo: req.body.phoneNo,
      amount: req.body.amount,
      method: req.body.method,
      status: req.body.status,
    };

    if (imageUrl) {
      depositData.image = imageUrl;
    }

    const deposit = await Deposit.create(depositData);
    res.status(201).json(deposit);
  } catch (err) {
    console.error("Error creating deposit:", err);
    res.status(400).json({ message: err.message || "Failed to create deposit" });
  }
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
  try {
    const updateData = { ...req.body };

    if (req.file && req.file.path) {
      updateData.image = req.file.path;
    }

    const deposit = await Deposit.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!deposit) return res.status(404).json({ message: "Deposit not found" });
    res.json(deposit);
  } catch (err) {
    console.error("Error updating deposit:", err);
    res.status(400).json({ message: err.message || "Failed to update deposit" });
  }
};

export const deleteDeposit = async (req, res) => {
  const deposit = await Deposit.findByIdAndDelete(req.params.id);
  if (!deposit) return res.status(404).json({ message: "Deposit not found" });
  res.json({ message: "Deposit deleted" });
};
