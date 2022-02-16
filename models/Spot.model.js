const { Schema, model } = require("mongoose");

const spotSchema = new Schema(
  {
    title: String,
    description: String,
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    // address: {
    //   street: String,
    //   postcode: String,
    //   city: String,
    // },
    // location: {
    //   type: { type: String },
    //   coordinates: [Number],
    // },
    averagePrice: {
      type: String,
      enum: ["€", "€€", "€€€"],
    },
    details: {
      openingHours: String,
      imageUrl: String,
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
  },
  {
    timestamps: true,
  }
);

spotSchema.index({ location: "2dsphere" });
module.exports = model("Spot", spotSchema);
