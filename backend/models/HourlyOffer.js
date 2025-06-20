const mongoose = require('mongoose');

const happyHoursOfferSchema = new mongoose.Schema({
  offerTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Food", "Salon", "Property", "Vehicle"],
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  MinimumPurchase: Number,
  NuRedemption: Number,
  offerImage: {
    type: String,
    default: '',
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: true,
  },
});

module.exports = mongoose.model('HappyHoursOffer', happyHoursOfferSchema);
