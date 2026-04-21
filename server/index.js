import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

dotenv.config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors());
app.use(express.json());

/* ---------------- DATABASE ---------------- */

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ Mongo Error:", err));

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

/* ---------------- ROUTES ---------------- */

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.post("/api/contact", async (req, res) => {
    console.log("🔥 RAW BODY:", req.body);

    try {
        const { name, email, message } = req.body;

        // Validate incoming data
        if (!name || !email || !message) {
            console.log("❌ Missing fields");
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        console.log("📥 Data received:", name, email, message);

        // Save to MongoDB
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        console.log("✅ Saved to MongoDB");

        // EMAIL TEMP DISABLED FOR DEBUGGING
        /*
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
            text: `
Name: ${name}
Email: ${email}
Message: ${message}
            `
        });

        console.log("📩 Email sent");
        */

        res.status(200).json({ success: true });

    } catch (error) {
        console.error("❌ FULL ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/* ---------------- SERVER ---------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on Port: ${PORT}`);
});