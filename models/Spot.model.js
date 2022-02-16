const { Schema, model } = require("mongoose");

const spotSchema = new Schema(
  {
    title: String,
    details: String,
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
      enum: ["€", "€€", "€€€"]
    },
  
    openingHours: String,
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

spotSchema.index({ location: "2dsphere" });
module.exports = model("Spot", spotSchema);
