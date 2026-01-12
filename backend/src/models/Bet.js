import mongoose from "mongoose";

const BetSchema = new mongoose.Schema(
  {
    supabaseId: {
      type: String,
      required: true,
    },

    prediction: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    possibleWin: {
      type: Number,
      default: 0,
    },

    isAccepted: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["pending", "win", "loss"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bet", BetSchema);
