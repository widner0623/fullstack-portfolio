import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import twilio from "twilio";

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
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const smsClient = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH
);

// quick check
transporter.verify((err) => {
    if (err) console.log("SMTP error:", err.message);
    else console.log("SMTP ready");
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

        // save to db
        const newContact = new Contact({ name, email, phone, message });
        await newContact.save();

        console.log("Saved to DB");

        const date = new Date().toLocaleString();

        // sms
       // sms (non-blocking)
    try {
        await smsClient.messages.create({
            body: `🔥 New Lead:
            Name: ${name}
            Phone: ${phone}
            Message: ${message}`,
            from: process.env.TWILIO_PHONE,
            to: process.env.MY_PHONE
        });
        console.log("SMS sent");
    } catch (err) {
        console.log("SMS failed:", err.message);
    }

        // email to you
        await transporter.sendMail({
            from: `"Derrick Widner" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `New Lead from ${name}`,
           html: `
            <div style="font-family: Arial, sans-serif; background:#f9fafb; padding:30px;">
            <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; padding:25px; border:1px solid #e5e7eb;">
                
                <h2 style="margin:0; color:#111827;">New Client Inquiry</h2>
                <p style="font-size:12px; color:#6b7280; margin-top:5px;">${date}</p>

                <hr style="border:none; border-top:1px solid #e5e7eb; margin:20px 0;" />

                <table style="width:100%; font-size:14px; color:#374151;">
                <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
                <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
                <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
                </table>

                <div style="margin-top:20px;">
                <strong>Project Details:</strong>
                <p style="margin-top:8px; line-height:1.6;">${message}</p>
                </div>

                <div style="margin-top:25px;">
                <a href="mailto:${email}"
                    style="display:inline-block; padding:10px 16px; background:#111827; color:#ffffff; text-decoration:none; border-radius:6px; margin-right:10px;">
                    Reply via Email
                </a>

                <a href="tel:${phone}"
                    style="display:inline-block; padding:10px 16px; background:#e5e7eb; color:#111827; text-decoration:none; border-radius:6px;">
                    Call Client
                </a>
                </div>

            </div>
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
            <div style="font-family: Arial, sans-serif; background:#f9fafb; padding:30px;">
            <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; padding:25px; border:1px solid #e5e7eb;">

                <h2 style="margin:0; color:#111827;">Redline Labs</h2>

                <p style="margin-top:20px;">Hey ${name},</p>

                <p style="color:#374151; line-height:1.6;">
                Thanks for reaching out — I’ve received your message and will be reviewing your project details shortly.
                I’ll follow up with you soon to discuss your goals, scope, and next steps.
                </p>

                <div style="margin-top:20px; padding:15px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px;">
                <p style="margin:0; font-size:14px; color:#374151;">
                    <strong>Project Expectations:</strong><br/>
                    • Most projects typically range between <strong>$500 – $2,000</strong><br/>
                    • Timelines vary depending on complexity, but most builds are completed within <strong>1–3 weeks</strong><br/>
                    • Final pricing and timeline are determined after reviewing full project details
                </p>
                </div>

                <p style="margin-top:20px; color:#374151;">
                In the meantime, feel free to check out some of my recent work below.
                </p>

                <a href="https://redlinelabs.vercel.app/projects"
                style="display:inline-block; margin-top:15px; padding:12px 18px; background:#111827; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:500;">
                View My Projects
                </a>

                <p style="margin-top:30px; font-size:14px; color:#6b7280;">
                – Derrick Widner<br/>
                Redline Labs
                </p>

            </div>
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