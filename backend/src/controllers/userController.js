import User from "../models/User.js";

export const createUser = async (req, res) => {
  const { supabaseId, email, role } = req.body;
  const user = await User.create({ supabaseId, email, role });
  res.status(201).json(user);
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const getUserBySupabaseId = async (req, res) => {
  const { supabaseId } = req.params;
  const user = await User.findOne({ supabaseId });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted" });
};
