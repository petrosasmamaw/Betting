import Bet from "../models/Bet.js";

export const createBet = async (req, res) => {
  try {
    const imageUrls = (req.files || []).map((file) => file.path);

    const betData = {
      supabaseId: req.body.supabaseId,
      amount: req.body.amount,
      possibleWin: req.body.possibleWin,
      isAccepted: req.body.isAccepted,
      status: req.body.status,
      images: imageUrls,
    };

    const bet = await Bet.create(betData);
    res.status(201).json(bet);
  } catch (err) {
    console.error("Error creating bet:", err);
    res.status(400).json({ message: err.message || "Failed to create bet" });
  }
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
  try {
    const updateData = { ...req.body };

    // If new images are uploaded, replace the images array
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => file.path);
    }

    const bet = await Bet.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!bet) return res.status(404).json({ message: "Bet not found" });
    res.json(bet);
  } catch (err) {
    console.error("Error updating bet:", err);
    res.status(400).json({ message: err.message || "Failed to update bet" });
  }
};

export const deleteBet = async (req, res) => {
  const bet = await Bet.findByIdAndDelete(req.params.id);
  if (!bet) return res.status(404).json({ message: "Bet not found" });
  res.json({ message: "Bet deleted" });
};
