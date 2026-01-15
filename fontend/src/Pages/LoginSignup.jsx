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












import React, { useState, memo } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    });

    // New States for OTP Logic
    const [isVerifying, setIsVerifying] = useState(false);
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(0);

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Timer for Resend OTP
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

    const login = async () => {
        let responseData;
        await fetch('https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((response) => response.json()).then((data) => responseData = data);

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        } else {
            alert(responseData.errors);
        }
    };

    const signup = async () => {
        let responseData;
        await fetch('https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((response) => response.json()).then((data) => responseData = data);

        if (responseData.success) {
            setIsVerifying(true);
            startTimer(); // Start countdown for resend
        } else {
            alert(responseData.errors);
        }
    };

    const verifyOtp = async () => {
        let responseData;
        await fetch('https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/verify-otp', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: formData.email, otp: otp }), // Send email and otp
        }).then((res) => res.json()).then((data) => responseData = data);

        if (responseData.success) {
            alert("Verification Successful! Please login.");
            setIsVerifying(false);
            setState("Login");
        } else {
            alert(responseData.message);
        }
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                {isVerifying ? (
                    <>
                        <h1>Verify Email</h1>
                        <div className="loginsignup-fields">
                            <p className="otp-text">Enter the 6-digit code sent to <br/><b>{formData.email}</b></p>
                            <input 
                                type="text" 
                                placeholder='Enter OTP' 
                                value={otp} 
                                onChange={(e) => setOtp(e.target.value)} 
                                maxLength="6"
                                className="otp-input"
                            />
                        </div>
                        <button onClick={verifyOtp}>Verify Account</button>
                        <p className="loginsignup-login">
                            Didn't receive code? {timer > 0 ? <span>Wait {timer}s</span> : <span onClick={signup}>Resend OTP</span>}
                        </p>
                    </>
                ) : (
                    <>
                        <h1>{state}</h1>
                        <div className="loginsignup-fields">
                            {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' /> : <></>}
                            <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
                            <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
                        </div>
                        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
                        {state === "Sign Up" ? 
                            <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Login Here</span></p> : 
                            <p className="loginsignup-login">Create An Account? <span onClick={() => { setState("Sign Up") }}>Click Here</span></p>
                        }
                        <div className="loginsignup-agree">
                            <input type="checkbox" name='' id='' />
                            <p>By continuing, I agree to the Terms of Service and Privacy Policy.</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default memo(LoginSignup);