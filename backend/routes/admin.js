const express = require('express');
const Owner = require('../models/Owner');
const User = require('../models/User');
const router = express.Router();

router.get('/view-owner', async(req, res) => {
    try {
        const owners = await Owner.find({});
        res.json(owners);
    }catch(error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get("/view-shop-user/:ownerId", async (req, res) => {
    try {
        const { ownerId } = req.params;

        // Fetch the shop owner's details
        const owner = await Owner.findById(ownerId);
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        // Fetch users linked to the owner
        const users = await User.find({ ownerId });

        res.status(200).json({ users, shopName: owner.shopName });
    } catch (error) {
        console.error("Error fetching shop users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



module.exports = router;

