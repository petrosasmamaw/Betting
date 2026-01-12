import mongoose from "mongoose";

const WithdrawalSchema = new mongoose.Schema(
  {
    supabaseId: {
      type: String,
      required: true,
    },

    phoneNo: {
      type: Number,
      required: true,
    },
    
    amount: {
      type: Number,
      required: true,
    },

    method: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Withdrawal", WithdrawalSchema);
