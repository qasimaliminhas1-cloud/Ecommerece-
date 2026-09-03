import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserPlus } from "lucide-react";

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Registration Successful!");
        navigate("/login");
    };

    return (
        <div>
            <div className="auth-header">
                <h2>Create Account</h2>
                <p>Join ShopPulse to start shopping today</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
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
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-input"
                        required
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>

                <button type="submit" className="btn-submit" style={{ marginTop: "1rem" }}>
                    <UserPlus size={18} /> Create Account
                </button>
            </form>

            <div className="auth-footer-link">
                Already have an account? <Link to="/login">Sign In</Link>
            </div>
        </div>
    );
};

export default Register;