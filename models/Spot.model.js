const { Schema, model } = require("mongoose");

const spotSchema = new Schema(
  {
    title: String,
    description: String,
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    averagePrice: {
      type: String,
      enum: ["€", "€€", "€€€"],
    },
    openingHours: String,
    imageUrl: String,
    details: {
      vegan: Boolean,
      vegetarian: Boolean,
      glutenFree: Boolean,
      petFriendly: Boolean,
      wifi: Boolean,
      powerStations: Boolean,
      quiet: Boolean,
      crowded: Boolean,
      happyHour: Boolean,
      liveMusic: Boolean,
      workDesks: Boolean,
    },
    location: {
      latitude: Number,
      longitude: Number,
    },
  },
  {
    timestamps: true,
  }
);

spotSchema.index({ location: "2dsphere" });
module.exports = model("Spot", spotSchema);
