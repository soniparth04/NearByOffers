const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  StartDate: Date,
  EndDate: Date,
  MinimumPurchase: Number,
  NuRedemption: Number,
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
  image: { type: String },
  category: {
    type: String,
    enum: ['Food', 'Salon', 'Property', 'Vehicle'],
    required: true
  },
  boosted: {
    type: Boolean,
    default: false
  },
  boostAmount: {
    type: Number,
    default: 0
  },
  boostReach: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model('CommonOffer', offerSchema);
