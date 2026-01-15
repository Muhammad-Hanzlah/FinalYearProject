// import { memo } from 'react';
// import './CSS/LoginSignup.css';
// import { useState } from 'react';

// const LoginSignup = () => {

//   const [state,setState] = useState ("Login")
//   const [formData,setFormData] = useState({
//     username:"",
//     password:"",
//     email:""
//   })

//   const changeHandler =(e)=>{
//     setFormData({...formData,[e.target.name]:e.target.value})
//   }

//   const login = async () =>{
//     console.log("Login Function Executed",formData);
//     let responseData;
//     await fetch('https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/login',{
//       method:'POST',
//       headers:{
//         Accept:'application/form-data',
//         'Content-type':'application/json'
//       },
//       body: JSON.stringify(formData)
//     }).then((response) => response.json()).then((data)=>responseData=data)
//     if(responseData.success){
//       localStorage.setItem('auth-token',responseData.token);
//       window.location.replace("/");
//     }
//     else{
//       alert(responseData.errors)
//     }
//   }
//   const signup = async () =>{
//     console.log("Signup Function Executed",formData);
//     let responseData;
//     await fetch('https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/signup',{
//       method:'POST',
//       headers:{
//         Accept:'application/form-data',
//         'Content-type':'application/json'
//       },
//       body: JSON.stringify(formData)
//     }).then((response) => response.json()).then((data)=>responseData=data)
//     if(responseData.success){
//       localStorage.setItem('auth-token',responseData.token);
//       window.location.replace("/");
//     }
//     else{
//       alert(responseData.errors)
//     }
//   }


//   return (
//     <div className='loginsignup'>
//       <div className="loginsignup-container">
//         <h1>{state}</h1>
//         <div className="loginsignup-fields">
//           {state==="Sign Up"?<input name='username' value={formData.username}onChange={changeHandler} type="text" placeholder='Your Name' />:<></>}
//           <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
//           <input name='password' value={formData.password}onChange={changeHandler} type="password" placeholder='Password' />
//         </div>
//         <button onClick={()=>{state ==="Login"?login():signup()}}>Continue</button>
//         {state === "Sign Up" ?<p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login Here</span></p>
//         :<p className="loginsignup-login">Creat An Account? <span onClick={()=>{setState("Sign Up")}}>Click Here</span></p>}
//         <div className="loginsignup-agree">
//           <input type="checkbox" name='' id='' />
//           <p>By continuing, I agree to the Terms of Service and Privacy Policy.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default memo(LoginSignup);














import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  // --- NEW STATES FOR OTP ---
  const [isVerifying, setIsVerifying] = useState(false); // Controls which form to show
  const [userEmail, setUserEmail] = useState(""); // Stores email to send to backend for verification
  const [otp, setOtp] = useState(""); // Captures the 6-digit code

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- UPDATED SIGNUP FUNCTION ---
  const signup = async () => {
    console.log("Signup Function Executed", formData);
    let responseData;
    await fetch('https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      // If user is saved in DB and email is sent, show the OTP screen
      setUserEmail(formData.email);
      setIsVerifying(true);
    } else {
      alert(responseData.errors);
    }
  };

  // --- NEW VERIFY OTP FUNCTION ---
  const verifyOtp = async () => {
    let responseData;
    await fetch('https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/verify-otp', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userEmail, otp: otp }), // Send both email and code
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      alert("Account Verified Successfully! Please Login.");
      window.location.replace("/login"); // Redirect to login page
    } else {
      alert(responseData.message);
    }
  };

  const login = async () => {
    console.log("Login Function Executed", formData);
    let responseData;
    await fetch('https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        {isVerifying ? (
          /* --- OTP INPUT SCREEN --- */
          <div className="loginsignup-fields">
            <h1>Verify Your Email</h1>
            <p>Please enter the 6-digit code sent to {userEmail}</p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
            />
            <button onClick={verifyOtp}>Verify Account</button>
          </div>
        ) : (
          /* --- ORIGINAL SIGNUP/LOGIN SCREEN --- */
          <>
            <h1>{state}</h1>
            <div className="loginsignup-fields">
              {state === "Sign Up" ? (
                <input
                  name="username"
                  value={formData.username}
                  onChange={changeHandler}
                  type="text"
                  placeholder="Your Name"
                />
              ) : (
                <></>
              )}
              <input
                name="email"
                value={formData.email}
                onChange={changeHandler}
                type="email"
                placeholder="Email Address"
              />
              <input
                name="password"
                value={formData.password}
                onChange={changeHandler}
                type="password"
                placeholder="Password"
              />
            </div>
            <button
              onClick={() => {
                state === "Login" ? login() : signup();
              }}
            >
              Continue
            </button>
            {state === "Sign Up" ? (
              <p className="loginsignup-login">
                Already have an account?{" "}
                <span onClick={() => setState("Login")}>Login here</span>
              </p>
            ) : (
              <p className="loginsignup-login">
                Create an account?{" "}
                <span onClick={() => setState("Sign Up")}>Click here</span>
              </p>
            )}
            <div className="loginsignup-agree">
              <input type="checkbox" name="" id="" />
              <p>By continuing, I agree to the terms of use & privacy policy.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;