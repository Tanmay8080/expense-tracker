import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";
import "../styles.css";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (login(email, password)) {
      navigate("/dashboard");
    } else {
      alert("Email or password is wrong");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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

          <button type="submit">Login</button>
        </form>
        <p onClick={() => navigate("/signup")}>Create Account</p>
      </div>
    </div>
  );
}
