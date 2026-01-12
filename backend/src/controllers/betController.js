import Bet from "../models/Bet.js";

export const createBet = async (req, res) => {
  const bet = await Bet.create(req.body);
  res.status(201).json(bet);
};

export const getBets = async (req, res) => {
  const bets = await Bet.find();
  res.json(bets);
};

export const getBetsBySupabaseId = async (req, res) => {
  const { supabaseId } = req.params;
  const bets = await Bet.find({ supabaseId });
  res.json(bets);
};

export const getBetById = async (req, res) => {
  const bet = await Bet.findById(req.params.id);
  if (!bet) return res.status(404).json({ message: "Bet not found" });
  res.json(bet);
}; 

export const updateBet = async (req, res) => {
  const bet = await Bet.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!bet) return res.status(404).json({ message: "Bet not found" });
  res.json(bet);
};

export const deleteBet = async (req, res) => {
  const bet = await Bet.findByIdAndDelete(req.params.id);
  if (!bet) return res.status(404).json({ message: "Bet not found" });
  res.json({ message: "Bet deleted" });
};
