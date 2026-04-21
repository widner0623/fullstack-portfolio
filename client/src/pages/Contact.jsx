import { useState } from "react";
import "../styles/contact.css";

function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");

        try {
            const res = await fetch("https://fullstack-portfolio-9fs7.onrender.com/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("Message sent!");
                setForm({ name: "", email: "", message: "" });
            } else {
                setStatus("Something went wrong.");
            }
        } catch (err) {
            setStatus("Server error.");
        }
    };

    return (
        <div className="contact">
            <h1>Contact Me</h1>

            <div className="marquee">
                <div className="marquee-track">
                    <span>
                        Let’s turn your idea into something real • Ready to start your project? • Let’s build something that stands out • Your vision deserves to be built • Let’s get to work •
                    </span>
                    <span>
                        Need a website that actually works for your business? • Built for performance, speed, and results • Clean design that converts visitors into customers • Let’s solve real problems •
                    </span>
                    <span>
                        Let’s turn your idea into something real • Ready to start your project? • Let’s build something that stands out • Your vision deserves to be built • Let’s get to work •
                    </span>
                    <span>
                        Need a website that actually works for your business? • Built for performance, speed, and results • Clean design that converts visitors into customers • Let’s solve real problems •
                    </span>
                </div>
            </div>

            <div className="form-wrapper">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="message"
                        placeholder="Tell me about your project..."
                        value={form.message}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Send Message</button>
                </form>

                <p className="form-status">{status}</p>
            </div>
        </div>
    );
}

export default Contact;