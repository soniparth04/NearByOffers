const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Owner" , required: true}, // 🔹 Link user to owner
    lastSpinTime: { type: Date }, // Track last spin time
    spinCooldown: { type: Number, default: 60 },
    claimedOffers: [
        {
            label: String,
            description: String,
            claimedAt: { type: Date, default: Date.now },
            expiry: { type: Date, expires: 0 },
        },
    ],
}, 
{ timestamps: true }
);

UserSchema.pre("save", function (next) {
    this.claimedOffers.forEach((offer) => {
      if (!offer.expiry) {
        offer.expiry = new Date(offer.claimedAt.getTime() + 24 * 60 * 60 * 1000); // Set expiry 24 hours later
      }
    });
    next();
  });
  
const User = mongoose.model('User', UserSchema);
module.exports = User;
