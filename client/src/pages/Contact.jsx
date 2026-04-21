import { useState } from "react";
import "../styles/contact.css";

function Contact() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        message: ""
    });

    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const formatPhone = (value) => {
        const digits = value.replace(/\D/g, "").slice(0, 10);

        const parts = [];

        if (digits.length > 0) {
            parts.push("+1");
        }
        if (digits.length >= 1) {
            parts.push(`(${digits.slice(0, 3)}`);
        }
        if (digits.length >= 4) {
            parts[1] += `)`;
            parts.push(` ${digits.slice(3, 6)}`);
        }
        if (digits.length >= 7) {
            parts.push(`-${digits.slice(6, 10)}`);
        }
        return parts.join("");
    };

    const handleChange = (e) => {
       const {name, value } = e.target;

       if (name === "phone") {
        setForm({
            ...form,
            phone: formatPhone(value)
        });
       } else {
        setForm({
            ...form,
            [name]: value
        });
       }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return; // prevent spam

        setLoading(true);
        setStatus("Sending...");

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/contact`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                }
            );

            const data = await res.json();

            if (res.ok) {
                setStatus("Message sent!");
                setForm({ name: "", email: "", message: "" });
            } else {
                setStatus(data.message || "Something went wrong.");
            }
        } catch (err) {
            setStatus("Server error. Try again.");
        } finally {
            setLoading(false);
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
                        type="tel"
                        name="phone"
                        placeholder="Your Phone "
                        value={form.phone}
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

                    <button type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>

                <p className="form-status">{status}</p>
            </div>
        </div>
    );
}

export default Contact;