import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

dotenv.config();

const app = express();

/* middleware */
app.use(cors({
    origin: [
        "https://redlinelabs.vercel.app",
        "http://localhost:5173"
    ],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());

/* db */
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err));

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model("Contact", contactSchema);

/* mail */
const transporter = nodemailer.createTransport({
    host: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// optional check
transporter.verify((err) => {
    if (err) {
        console.log("SMTP error:", err.message);
    } else {
        console.log("SMTP ready");
    }
});

/* routes */
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.post("/api/contact", async (req, res) => {
    try {
        console.log("Incoming:", req.body);

        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // save
        const newContact = new Contact({ name, email, phone, message });
        await newContact.save();

        console.log("Saved to DB");

        const date = new Date().toLocaleString();

        // send to me
        await transporter.sendMail({
            from: `"Derrick Widner" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `New Lead from ${name}`,
            html: `
                <div style="font-family: Arial; padding:20px;">
                    <h2>New Client Inquiry</h2>
                    <p style="font-size:12px; color:#777;">${date}</p>
                    <hr/>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                </div>
            `
        });

        console.log("Sent email to me");

        // auto reply
        await transporter.sendMail({
            from: `"Derrick Widner" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Got your message",
            html: `
                <div style="font-family: Arial; padding:20px;">
                    <h2>Thanks for reaching out</h2>
                    <p>Hey ${name},</p>
                    <p>I got your message and will get back to you soon.</p>
                    <p>- Derrick W.</p>
                </div>
            `
        });

        console.log("Sent auto reply");

        res.status(200).json({ success: true });

    } catch (error) {
        console.error("FULL ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

/* server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});