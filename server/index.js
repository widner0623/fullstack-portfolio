import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// middleware
app.use(cors({
    origin: [
        "https://redlinelabs.vercel.app",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());

// db
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("Mongo error:", err));

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model("Contact", contactSchema);

// routes
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // email
        const transporter = nodemailer.createTransport({
            service: "icloud",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "New Contact Form Submission",
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        });

        res.status(200).json({ success: true });

    } catch (error) {
        console.error("Server error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});