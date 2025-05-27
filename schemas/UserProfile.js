const { Schema, model } = require("mongoose");

const userProfileSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    snusCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = model("UserProfile", userProfileSchema);
