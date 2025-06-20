const mongoose = require('mongoose');

const walletTransactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['credit', 'debit'], required: true },
  amount: { type: Number, required: true },
  reason: { type: String },
  date: { type: Date, default: Date.now }
});


const OwnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    shopName: { type: String, required: true },
    password: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pinCode: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String },
    addressline: { type: String },
    category: {
        type: String,
        enum: [
            'Restaurant',
            'Salon',
            'Retail',
            'Cafe',
            'Gym',
            'Spa',
            'Electronics',
            'Fashion',
            'Grocery',
            'Bakery',
            'Pharmacy',
            'Other'
        ],
        required: true
    },
    openingHours: {
        type: String,
        required: true,
    },
    closingHours: {
        type: String,
        required: true,
    },
    openingDays: { type: [String], required: true },
    shopImage: { type: String },
    profileImage: { type: String },
    walletBalance: {
        type: Number,
        default: 0
    },
    walletTransactions: [walletTransactionSchema]
}, { timestamps: true });

const Owner = mongoose.model('Owner', OwnerSchema);
module.exports = Owner;
