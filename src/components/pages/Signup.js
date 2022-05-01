import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import classes from "../../styles/Signup.module.css";
import Button from "../Button";
import Checkbox from "../Checkbox";
import Form from "../Form";
import Illustration from "../Illustration";
import TextInput from "../TextInput";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState("");

  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  // auth
  const { signup } = useAuth();
  const navigate = useNavigate();

  // as signup of firebase is async function
  async function handleSubmit(e) {
    console.log("Hello World!");
    // stop the reload
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Password don't match!");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, username);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError("Failed to signup");
    }
  }

  return (
    <>
      <h1>Create an account</h1>
      <div className="column">
        <Illustration />
        <Form className={`${classes.signup}`} onSubmit={handleSubmit}>
          <TextInput
            type="text"
            placeholder="Enter name"
            icon="person"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextInput
            type="text"
            required
            placeholder="Enter email"
            icon="alternate_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            type="password"
            required
            placeholder="Enter password"
            icon="lock"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextInput
            type="password"
            required
            placeholder="Confirm password"
            icon="lock_clock"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Checkbox
            required
            text="I agree to the Terms and Conditions"
            value={agree}
            onChange={(e) => setAgree(e.target.value)}
          />
          <Button type="submit" disabled={loading}>
            <span> Submit Now </span>
          </Button>

          {error && <p className="error">{error}</p>}

          <div className="info">
            Already have an account? <a href="login.html">Login</a> instead.
          </div>
        </Form>
      </div>
    </>
  );
}
