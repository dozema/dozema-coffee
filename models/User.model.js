const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    favoriteSpots: [{ type: Schema.Types.ObjectId, ref: "Spot" }],
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
