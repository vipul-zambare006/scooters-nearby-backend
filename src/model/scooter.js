const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transform = (_doc, ret) => {
  delete ret.__v;
};

const transformJSON = (_doc, ret) => {
  delete ret.__v;
  delete ret._id;
};

const ScooterSchema = Schema(
  {
    location: {
      type: { type: String, enum: "Point", default: "Point" },
      coordinates: { type: [Number], default: [0, 0] }
    },
    isActive: Boolean
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
    toObject: {
      virtuals: true,
      transform
    },
    toJSON: {
      virtuals: true,
      transform: transformJSON
    }
  }
);
ScooterSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("scooters", ScooterSchema);
