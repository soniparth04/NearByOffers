require('dotenv').config(); // Load .env variables

const express = require('express');
const session = require('express-session');
const MongoStore = require("connect-mongo");

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;



// Import the DB connection setup
require('./db'); // Assuming the db.js file is in the same directory

// Middleware setup
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true }));


app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // ✅ Stores sessions in MongoDB
        cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 } 
    })
);

// ✅ Add the test session route here
app.get('/api/test-session', (req, res) => {
    console.log('Session data:', req.session);
    res.json(req.session);
});

// Example route for user signup
const userRoutes = require('./routes/user');
const ownerRoutes = require('./routes/owner')
const adminRoutes = require("./routes/admin")
const walletRoute = require("./routes/wallet")
app.use('/api/user', userRoutes); 
app.use("/api/owner", ownerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/wallet', walletRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
