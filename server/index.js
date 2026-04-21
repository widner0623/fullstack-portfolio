import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

// load environment variables
dotenv.config();

const app = express();

/* =========================
   MIDDLEWARE
========================= */

// allow requests from my frontend (Vercel + local dev)
app.use(cors({
    origin: [
        "https://redlinelabs.vercel.app",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST"],
    credentials: true
}));

// allow JSON data in requests
app.use(express.json());

/* =========================
   DATABASE CONNECTION
========================= */

// connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err));

// schema for contact form submissions
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// create model (collection will be "contacts")
const Contact = mongoose.model("Contact", contactSchema);

/* =========================
   ROUTES
========================= */

// basic test route
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.post("/api/contact", async (req, res) => {
    console.log("Incoming request body:", req.body);

    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Save to MongoDB
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        console.log("✅ Saved to database");

        // 🚨 EMAIL TEMP DISABLED
        // const transporter = nodemailer.createTransport({...})
        // await transporter.sendMail({...})

        res.status(200).json({ success: true });

    } catch (error) {
        console.error("❌ ERROR:", error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/* =========================
   SERVER START
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});