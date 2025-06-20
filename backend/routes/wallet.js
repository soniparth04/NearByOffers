const express = require('express');
const router = express.Router();
const Owner = require('../models/Owner');

// Add balance to wallet (manual)
router.post('/add-balance/:ownerId', async (req, res) => {
   const { ownerId } = req.params;
  const { amount } = req.body;

  try {
    if (amount <= 0) {
      return res.status(400).json({ message: 'Amount must be positive' });
    }

    const owner = await Owner.findById(ownerId);
    if (!owner) return res.status(404).json({ message: 'Owner not found' });

    owner.walletBalance += amount;

    // Push transaction into embedded array
    owner.walletTransactions.push({
      type: 'credit',
      amount,
      reason: 'Manual Top-up'
    });

    await owner.save();

    res.json({
      message: 'Balance added successfully',
      walletBalance: owner.walletBalance,
      transactions: owner.walletTransactions
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



module.exports = router;
