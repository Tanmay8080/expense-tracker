import { useNavigate } from "react-router-dom";
import { signup } from "../utils/auth";
import "../styles.css";

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signup(email, password);
    alert("Account created successfully!");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSignup}>
          <input
            name="email"
            type="email"
            placeholder="Email ID"
            required
          />
          <input
             name="password"
             type="password"
             placeholder="Password (Eg: Abc@1234)"
             required
            />
          <button type="submit">Signup</button>
        </form>
        <p onClick={() => navigate("/")}>Already have an account? Login</p>
      </div>
    </div>
  );
}
