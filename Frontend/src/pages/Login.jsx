import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { LogIn } from "lucide-react";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate successful login
        alert("Login Successful!");
        navigate("/");
    };

    return (
        <div>
            <div className="auth-header">
                <h2>Welcome Back</h2>
                <p>Please enter your credentials to sign in</p>
            </div>

            <form onSubmit={handleSubmit}>
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
                    <LogIn size={18} /> Sign In
                </button>
            </form>

            <div className="auth-footer-link">
                Don't have an account? <Link to="/register">Register here</Link>
            </div>
        </div>
    );
};

export default Login;