import mongoose from "mongoose";

const BetSchema = new mongoose.Schema(
  {
    supabaseId: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length >= 1 && arr.length <= 5;
        },
        message: "You must upload between 1 and 5 images.",
      },
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
