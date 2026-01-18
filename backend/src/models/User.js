import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    supabaseId: {
      type: String,
      unique: true,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
     

    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
