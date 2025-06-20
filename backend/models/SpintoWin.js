const mongoose = require("mongoose");

const SpintoWinSchema = new mongoose.Schema({
    label: { type: String, required: true },
    description: { type: String, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true}, // 🔹 Link coupon to owner
    createdDate: { type: Date, default: Date.now },
    expiryDate: { type: Date, required: true }
}, { timestamps: true });

const SpintoWin = mongoose.model("Coupon", SpintoWinSchema);
module.exports = SpintoWin;
