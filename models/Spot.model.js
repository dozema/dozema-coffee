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
    // location: {
    //   type: { type: String },
    //   coordinates: [Number],
    // },
    averagePrice: Number,
    openingHours: String,
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

spotSchema.index({ location: "2dsphere" });
module.exports = model("Spot", spotSchema);
