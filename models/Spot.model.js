const { Schema, model } = require("mongoose");

const spotSchema = new Schema(
  {
    title: String,
    details: String,
    description: String,
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    rating: Number,
    address: {
      street: String,
      number: Number,
      postcode: Number,
      city: String,
    },
    averagePrice: Number,
    openingHours: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Spot", spotSchema);
