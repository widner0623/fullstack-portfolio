import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- DATABASE ---------------- */

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

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
    const { name, email, message } = req.body;

    try {
        // Save to MongoDB
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // Email setup (iCloud SMTP)
        const transporter = nodemailer.createTransport({
            service: "icloud",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Send email
//         await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to: process.env.EMAIL_USER,
//             subject: "New Contact Form Submission",
//             text: `
// Name: ${name}
// Email: ${email}
// Message: ${message}
//             `
//         });

        console.log("New Contact Form Submission:");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Message:", message);

        res.status(200).json({ success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
});