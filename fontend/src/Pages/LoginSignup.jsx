import React, { useState, memo } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    newPassword: "", // Added for reset logic
  });

  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const startTimer = () => {
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // --- AUTH FUNCTIONS ---
  const login = async () => {
    let responseData;
    await fetch(
      "https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const signup = async () => {
    let responseData;
    await fetch(
      "https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/signup",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      setIsVerifying(true);
      startTimer();
    } else {
      alert(responseData.errors);
    }
  };

  const verifyOtp = async () => {
    let responseData;
    await fetch(
      "https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/verify-otp",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, otp: otp }),
      }
    )
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      alert("Verification Successful!");
      setIsVerifying(false);
      setState("Login");
    } else {
      alert(responseData.message);
    }
  };

  // --- NEW FORGOT PASSWORD FUNCTIONS ---
  const forgotPassword = async () => {
    let responseData;
    await fetch(
      "https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/forgot-password",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      }
    )
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      setIsVerifying(true); // Switch to OTP input
      startTimer();
    } else {
      alert(responseData.message);
    }
  };

  const resetPassword = async () => {
    let responseData;
    await fetch(
      "https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/reset-password",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: otp,
          newPassword: formData.newPassword,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      alert("Password Reset Successfully!");
      setIsVerifying(false);
      setState("Login");
    } else {
      alert(responseData.message);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        {isVerifying ? (
          <>
            <h1>{state === "Forgot" ? "Reset Password" : "Verify Email"}</h1>
            <div className="loginsignup-fields">
              <p className="otp-text">
                Enter code sent to <b>{formData.email}</b>
              </p>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
                className="otp-input"
              />
              {state === "Forgot" && (
                <input
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={changeHandler}
                  type="password"
                  placeholder="Enter New Password"
                />
              )}
            </div>
            <button onClick={state === "Forgot" ? resetPassword : verifyOtp}>
              {state === "Forgot" ? "Update Password" : "Verify Account"}
            </button>
            <p className="loginsignup-login">
              Didn't receive code?{" "}
              {timer > 0 ? (
                <span>Wait {timer}s</span>
              ) : (
                <span onClick={state === "Forgot" ? forgotPassword : signup}>
                  Resend Code
                </span>
              )}
            </p>
          </>
        ) : (
          <>
            <h1>{state}</h1>
            <div className="loginsignup-fields">
              {state === "Sign Up" && (
                <input
                  name="username"
                  value={formData.username}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Your Name"
                />
              )}
              <input
                name="email"
                value={formData.email}
                onChange={changeHandler}
                type="email"
                placeholder="Email Address"
              />
              {state !== "Forgot" && (
                <input
                  name="password"
                  value={formData.password}
                  onChange={changeHandler}
                  type="password"
                  placeholder="Password"
                />
              )}
            </div>
            <button
              onClick={() => {
                if (state === "Login") login();
                else if (state === "Sign Up") signup();
                else forgotPassword();
              }}
            >
              Continue
            </button>

            <div className="login-options">
              {state === "Login" && (
                <p className="forgot-link" onClick={() => setState("Forgot")}>
                  Forgot Password?
                </p>
              )}
              {state === "Sign Up" ? (
                <p className="loginsignup-login">
                  Already have an account?{" "}
                  <span onClick={() => setState("Login")}>Login Here</span>
                </p>
              ) : (
                <p className="loginsignup-login">
                  {state === "Forgot" ? "Back to " : "Create An Account? "}
                  <span
                    onClick={() =>
                      setState(state === "Forgot" ? "Login" : "Sign Up")
                    }
                  >
                    Click Here
                  </span>
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(LoginSignup);
