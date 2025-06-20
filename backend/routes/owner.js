const express = require('express');
const bcrypt = require("bcryptjs");
const User = require('../models/User');
const SpintoWin = require('../models/SpintoWin')
const Owner = require("../models/Owner");
const CommonOffer = require("../models/CommonOffer");
const Catalog = require("../models/Catalog");
const mongoose = require('mongoose');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const router = express.Router();
const HappyHoursOffer = require("../models/HourlyOffer")

// Multer setup
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'common-offers',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        transformation: [{ width: 800, height: 800, crop: 'limit' }],
    },
});

const upload = multer({ storage });

// ✅ Middleware to Authenticate Owners
const authenticateOwner = (req, res, next) => {
    console.log("[Auth Middleware] Session Data:", req.session); // Debugging
    if (!req.session || !req.session.ownerId) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
    }
    req.ownerId = req.session.ownerId;
    next();
};


router.post("/owner-registration", upload.fields([
    { name: 'shopImage', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 }
]), async (req, res) => {
    try {
        const { name, phone, email, shopName, password, city, state, country, pinCode, address, latitude, longitude, category, openingHours, closingHours, openingDays, addressline } = req.body;

        if (!name || !phone || !email || !shopName || !password || !city || !state || !country || !pinCode || !address || !addressline || !latitude || !longitude || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingOwner = await Owner.findOne({ email });
        if (existingOwner) {
            return res.status(400).json({ message: "Owner already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Extract uploaded image URLs from Cloudinary
        const shopImage = req.files['shopImage'] ? req.files['shopImage'][0].path : null;
        const profileImage = req.files['profileImage'] ? req.files['profileImage'][0].path : null;

        const newOwner = new Owner({
            name,
            phone,
            email,
            shopName,
            password: hashedPassword,
            city,
            state,
            country,
            pinCode,
            latitude,
            longitude,
            address,
            addressline,
            category,
            openingHours,
            closingHours,
            shopImage,
            profileImage,
            openingDays,
        });

        await newOwner.save();
        req.session.ownerId = newOwner._id;

        res.status(201).json({
            message: "Owner registered successfully",
            ownerId: newOwner._id,
            shopImage,
            profileImage
        });

    } catch (error) {
        console.error("[Owner Registration] Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// ✅ Owner Login Route
router.post('/owner-login', async (req, res) => {
    try {
        const { phone, password } = req.body;

        if (!phone || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const owner = await Owner.findOne({ phone });
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        const isMatch = await bcrypt.compare(password, owner.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        req.session.ownerId = owner._id;
        console.log("[Owner Login] Session after login:", req.session); // Debugging

        res.status(200).json({ message: "Login successful", ownerId: owner._id, shopName: owner.shopName });

    } catch (error) {
        console.error("[Owner Login] Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Owner Logout Route
router.post("/owner-logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.clearCookie("connect.sid");
        console.log("[Owner Logout] Logout successful");
        res.status(200).json({ message: "Logout successful" });
    });
});

// ✅ Owner Reset Password
router.post("/owner-reset-password", async (req, res) => {
    try {
        const { phone, newPassword } = req.body;

        if (!phone || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const owner = await Owner.findOne({ phone });
        if (!owner) {
            return res.status(404).json({ message: "Owner not found with this phone number" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        owner.password = hashedPassword;
        await owner.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("[Owner Reset Password] Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Fetch Owner Info
router.get("/owner-info", async (req, res) => {
    console.log("[Owner Info] Session Data:", req.session); // Debugging

    if (!req.session.ownerId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const owner = await Owner.findById(req.session.ownerId).lean();
        if (!owner) {
            return res.status(404).json({ message: "Owner not found" });
        }

        res.json(owner); // Send full owner info
    } catch (error) {
        console.error("[Owner Info] Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



// Add SpinToWin Offer
router.post("/add-offer", authenticateOwner, async (req, res) => {
    try {
        const { label, description, expiryDate } = req.body;
        if (!label || !description || !expiryDate) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const newOffer = new SpintoWin({ label, description, expiryDate, ownerId: req.ownerId });
        await newOffer.save();
        res.status(201).json({ message: "Offer added successfully!" });

    } catch (error) {
        console.error("[Add Offer] Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Add Spotlight Offer
router.post('/create-offer', authenticateOwner,  upload.single('image'), async (req, res) => {
    const { title, description, StartDate, EndDate, MinimumPurchase, NuRedemption, ownerId, category } = req.body;

    try {
        const imagePath = req.file ? req.file.path : null;

        const newOffer = new CommonOffer({
            title,
            description,
            StartDate,
            EndDate,
            MinimumPurchase,
            NuRedemption,
            ownerId,
            image: imagePath,
            category
        });

        const savedOffer = await newOffer.save();
        res.status(201).json(savedOffer);
    } catch (err) {
        console.error('Error creating offer:', err);
        res.status(500).json({ error: 'Failed to create offer' });
    }
});

// Add Happy Hours Offers
router.post('/create-happy-hours', authenticateOwner,  upload.single('offerImage'), async (req, res) => {
    const { offerTitle, description, category, startTime, endTime, Date,  MinimumPurchase, NuRedemption,  ownerId } = req.body;

    try {
        const imagePath = req.file ? req.file.path : null;

        const newhappyoffer = new HappyHoursOffer({
            offerTitle,
            description, 
            category,
            startTime,
            endTime,
            MinimumPurchase,
            NuRedemption,
            offerImage: imagePath,
            Date,
            ownerId
        });

        const savedhappyoffers = await newhappyoffer.save();
        res.status(201).json(savedhappyoffers);
    } catch (err) {
        console.error('Error creating offer:', err);
        res.status(500).json({ error: 'Failed to create offer' });
    }
});


// Get All Happy Hours Offers
router.get('/get-all-happy-hours', authenticateOwner,  async (req, res) => {
    try {
        const offers = await HappyHoursOffer.find().sort({ Date: -1 }); // newest first
        res.status(200).json(offers);
    } catch (error) {
        console.error('Error fetching happy hour offers:', error);
        res.status(500).json({ error: 'Failed to fetch happy hour offers' });
    }
});

// GET all common offers
router.get('/common-offers', authenticateOwner, async (req, res) => {
    try {
        const offers = await CommonOffer.find({ ownerId: req.ownerId });
        res.status(200).json(offers);
    } catch (err) {
        console.error("Error fetching common offers:", err);
        res.status(500).json({ error: "Failed to fetch  offers" });
    }
});

// Get All SpintoWin Offers
router.get("/view-offers", authenticateOwner, async (req, res) => {
    try {
        const offers = await SpintoWin.find({ ownerId: req.ownerId });
        res.json(offers);
    } catch (err) {
        console.error("[View Offers] Error:", err);
        res.status(500).json({ message: "Error fetching offers" });
    }
});


// ✅ DELETE Happy Hour Offer
router.delete('/delete-happy-hour/:id', authenticateOwner,  async (req, res) => {
    try {
        const deletedOffer = await HappyHoursOffer.findByIdAndDelete(req.params.id);
        if (!deletedOffer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.status(200).json({ message: 'Offer deleted successfully' });
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ message: 'Server error while deleting' });
    }
});


router.put('/update-happy-offer/:id',  authenticateOwner,  upload.single('offerImage'), async (req, res) => {
    try {
        const offerId = req.params.id;

        const { offerTitle, description, category, startTime, endTime, Date } = req.body;

        const updateData = {
            offerTitle,
            description,
            category,
            startTime,
            endTime,
            Date,
        };

        // If new image uploaded
        if (req.file) {
            updateData.offerImage = `http://localhost:5000/uploads/${req.file.filename}`; // or Cloudinary URL
        }

        const updatedOffer = await HappyHoursOffer.findByIdAndUpdate(offerId, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedOffer) {
            return res.status(404).json({ error: "Offer not found" });
        }

        return res.status(200).json({ message: "Offer updated", offer: updatedOffer });
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ error: "Failed to update offer" });
    }
});


// Get single Happy Hour offer by ID
router.get('/get-happy-hour/:id', authenticateOwner,  async (req, res) => {
    try {
        const offer = await HappyHoursOffer.findById(req.params.id);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.status(200).json(offer);
    } catch (err) {
        console.error('Error fetching offer:', err);
        res.status(500).json({ message: 'Server error while fetching offer' });
    }
});


// Delete SpintoWin Offers
router.delete("/delete-offer/:id", authenticateOwner, async (req, res) => {
    try {
        await SpintoWin.findByIdAndDelete(req.params.id);
        res.json({ message: "Offer deleted successfully" });
    } catch (err) {
        console.error("[Delete Offer] Error:", err);
        res.status(500).json({ message: "Error deleting offer" });
    }
});

// Add Catalog 
router.post("/add-catalog",authenticateOwner,  upload.array('images', 5), async (req, res) => {
    const { title, description, ownerId, price } = req.body;

    try {
        // Check if images were uploaded and log the result
        console.log('Uploaded Files:', req.files);

        // Extract URLs from uploaded files
        const imageUrls = req.files.map(file => file.path);

        console.log('Image URLs:', imageUrls);

        const newCatalog = new Catalog({
            title,
            description,
            ownerId,
            price,
            image: imageUrls, // Store array of URLs
        });

        const savedCatalog = await newCatalog.save();
        res.status(201).json(savedCatalog);
    } catch (err) {
        console.error("Error adding catalog:", err);
        res.status(500).json({ error: "Failed to add catalog" });
    }
});


// get catalog 
router.get('/view-catalog', authenticateOwner, async (req, res) => {
    try {
        const catalogs = await Catalog.find({ ownerId: req.ownerId });
        res.status(200).json(catalogs);
    } catch (err) {
        console.error("Error fetching catalog:", err);
        res.status(500).json({ error: "Failed to fetch  catalog" });
    }
})

// ✅ Fetch Single Offer by ID
router.get("/view-offer/:id", authenticateOwner, async (req, res) => {
    try {
        const offer = await SpintoWin.findOne({ _id: req.params.id, ownerId: req.ownerId });
        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }
        res.json(offer);
    } catch (error) {
        console.error("[View Single Offer] Error:", error);
        res.status(500).json({ message: "Error fetching offer" });
    }
});

// Edit Spintowin offers
router.put("/edit-offer/:id", authenticateOwner, async (req, res) => {
    try {
        const { label, description, expiryDate } = req.body;
        if (!label || !description || !expiryDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedOffer = await SpintoWin.findOneAndUpdate(
            { _id: req.params.id, ownerId: req.ownerId },
            { label, description, expiryDate },
            { new: true }
        );

        if (!updatedOffer) {
            return res.status(404).json({ message: "Offer not found" });
        }

        res.json({ message: "Offer updated successfully!", updatedOffer });
    } catch (error) {
        console.error("[Edit Offer] Error:", error);
        res.status(500).json({ message: "Error updating offer" });
    }
});

router.post('/boost-offer/:offerId', async (req, res) => {
  const { offerId } = req.params;
  const { amount } = req.body;

  // Example reach formula: ₹1 = 3 users
  const reach = amount * 3;

  const offer = await SpotlightOffer.findByIdAndUpdate(offerId, {
    boosted: true,
    boostAmount: amount,
    boostReach: reach
  }, { new: true });

  res.status(200).json({ success: true, data: offer });
});


// GET /api/owner/:id - Get owner by ID
router.get('/:id', async (req, res) => {
  const ownerId = req.params.id;

  try {
    const owner = await Owner.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    res.status(200).json(owner);
  } catch (error) {
    console.error('Error fetching owner:', error);
    res.status(500).json({ message: 'Error fetching owner', error: error.message });
  }
});


// PUT /api/owner/:id - Update owner profile
router.put('/:id', async (req, res) => {
  const ownerId = req.params.id;
  const updateData = req.body;

  try {
    const existingOwner = await Owner.findById(ownerId);
    if (!existingOwner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    // Update owner fields
    Object.assign(existingOwner, updateData);

    const updatedOwner = await existingOwner.save();
    res.status(200).json({ message: 'Owner updated successfully', owner: updatedOwner });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Failed to update owner', error: err.message });
  }
});


module.exports = router;
