const { Schema, model } = require("mongoose");

const spotSchema = new Schema(
  {
    title: String,
    details: String,
    description: String,
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    address: {
      street: String,
      postcode: String,
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
