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

    details: [
      {
        type: String,
        enum: [
          "Vegan",
          "Vegetarian",
          "Gluten-free",
          "Pet-friendly",
          "Wifi",
          "Power stations",
          "Work desks",
          "Quiet",
          "Crowded",
          "Happy hour",
          "Live music",
        ],
      },
    ],
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
