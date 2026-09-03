// src/pages/Contact.jsx
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <div className="contact-container">
            <div className="contact-header">
                <h2>Get in Touch</h2>
                <p>Have questions or feedback? We'd love to hear from you.</p>
            </div>

            <div className="contact-grid">
                {/* Info Cards */}
                <div className="contact-info-list">
                    <div className="info-card">
                        <div className="info-icon-box">
                            <Mail size={22} />
                        </div>
                        <div className="info-details">
                            <h4>Email Us</h4>
                            <p>support@shoppulse.com</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="info-icon-box">
                            <Phone size={22} />
                        </div>
                        <div className="info-details">
                            <h4>Call Us</h4>
                            <p>+1 (800) 555-0199</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="info-icon-box">
                            <MapPin size={22} />
                        </div>
                        <div className="info-details">
                            <h4>Headquarters</h4>
                            <p>123 Commerce Way, Tech District</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="contact-form-card">
                    {submitted ? (
                        <div style={{ textAlignment: "center", padding: "2rem 0", color: "var(--success)" }}>
                            <h3>Thank you for reaching out!</h3>
                            <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
                                We have received your message and will get back to you shortly.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    required
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    required
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    className="form-input"
                                    required
                                    placeholder="How can we help you?"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <button type="submit" className="btn-submit">
                                <Send size={18} /> Send Message
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;