// import React, { useContext, useState } from 'react';
// import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { ShopContext } from '../../Context/ShopContext';
// import './CheckOut.css';
// const PaymentPage = () => {
//     const { getTotalCartAmount } = useContext(ShopContext);
//     const stripe = useStripe();
//     const elements = useElements();
//     const [loading, setLoading] = useState(false);
//     const [status, setStatus] = useState("");

//     const handleFinalPay = async (e) => {
//         e.preventDefault();
//         if (!stripe || !elements) return;

//         setLoading(true);
//         const cardNumberElement = elements.getElement(CardNumberElement);

//         // 1. Generate secure token from card details
//         const { error, token } = await stripe.createToken(cardNumberElement);

//         if (error) {
//             setStatus(error.message);
//             setLoading(false);
//             return;
//         }

//         // 2. Send token and amount to your Backend (Port 4000)
//         try {
//             const response = await fetch('httpss://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/payment', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     token: token.id,
//                     amount: getTotalCartAmount()
//                 })
//             });

//             const data = await response.json();
//             if (data.success) {
//                 setStatus("Payment Finished Successfully!");
//                 // Optional: Clear cart or redirect to home here
//             } else {
//                 setStatus("Payment Failed: " + data.message);
//             }
//         } catch (err) {
//             setStatus("Server error. Check if backend is running.");
//         }
//         setLoading(false);
//     };

//     return (
//         <div className="payment-screen">
//             <div className="payment-box">
//                 <h2 className="payment-header">Stripe Payment Integration</h2>
//                 <form onSubmit={handleFinalPay}>
//                     <div className="stripe-field-full">
//                         <CardNumberElement className="stripe-input-el" />
//                     </div>
//                     <div className="stripe-field-row">
//                         <div className="stripe-field-half">
//                             <CardExpiryElement className="stripe-input-el" />
//                         </div>
//                         <div className="stripe-field-half">
//                             <CardCvcElement className="stripe-input-el" />
//                         </div>
//                     </div>
//                     <button type="submit" className="final-pay-btn" disabled={loading}>
//                         {loading ? "Processing..." : "Pay Now"}
//                     </button>
//                     {status && <p className="payment-info">{status}</p>}
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default PaymentPage;











// import React, { useContext, useState } from 'react';
// import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { ShopContext } from '../../Context/ShopContext';
// import './CheckOut.css';

// const CheckOut = () => {
//     const { getTotalCartAmount } = useContext(ShopContext);
//     const stripe = useStripe();
//     const elements = useElements();
    
//     const [loading, setLoading] = useState(false);
//     const [status, setStatus] = useState("");

//     const handlePayment = async (e) => {
//         e.preventDefault();

//         if (!stripe || !elements) {
//             return; // Stripe has not loaded yet
//         }

//         setLoading(true);
//         setStatus("Processing...");

//         // 1. Create a Token from the raw card elements
//         const cardNumberElement = elements.getElement(CardNumberElement);
//         const { error, token } = await stripe.createToken(cardNumberElement);

//         if (error) {
//             setStatus(error.message);
//             setLoading(false);
//         } else {
//             // 2. Send the Token ID and Amount to your Backend
//             try {
//                 const response = await fetch('httpss://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/payment', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         token: token.id,
//                         amount: getTotalCartAmount(),
//                     }),
//                 });

//                 const data = await response.json();

//                 if (data.success) {
//                     setStatus("Success! Payment received in Sandbox.");
//                 } else {
//                     setStatus("Payment Failed: " + data.message);
//                 }
//             } catch (err) {
//                 setStatus("Server Error. Please try again.");
//             }
//             setLoading(false);
//         }
//     };

//     return (
//         <div className='checkout-container'>
//             <div className="checkout-box">
//                 <h2>Sandbox Payment</h2>
//                 <p>Total Amount: ${getTotalCartAmount()}</p>
//                 <form onSubmit={handlePayment}>
//                     <div className="input-group">
//                         <label>Card Number</label>
//                         <CardNumberElement className="stripe-input" />
//                     </div>
//                     <div className="input-row">
//                         <div className="input-group">
//                             <label>Expiry Date</label>
//                             <CardExpiryElement className="stripe-input" />
//                         </div>
//                         <div className="input-group">
//                             <label>CVC</label>
//                             <CardCvcElement className="stripe-input" />
//                         </div>
//                     </div>
//                     <button className="pay-button" disabled={loading || !stripe}>
//                         {loading ? "Verifying..." : "Pay Now"}
//                     </button>
//                 </form>
//                 {status && <p className="status-msg">{status}</p>}
//             </div>
//         </div>
//     );
// };

// export default CheckOut;















// import React, { useContext, useState } from 'react';
// import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { ShopContext } from '../../Context/ShopContext';
// import './CheckOut.css';

// const CheckOut = () => {
//     const { getTotalCartAmount } = useContext(ShopContext);
//     const stripe = useStripe();
//     const elements = useElements();
//     const [loading, setLoading] = useState(false);
//     const [status, setStatus] = useState("");

//     // --- 1. DEFINE THE STYLE HERE ---
//     const inputStyle = {
//         style: {
//             base: {
//                 fontSize: '16px',
//                 color: '#32325d',
//                 fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//                 '::placeholder': {
//                     color: '#aab7c4',
//                 },
//             },
//             invalid: {
//                 color: '#fa755a',
//                 iconColor: '#fa755a',
//             },
//         },
//     };

//     const handlePayment = async (e) => {
//         e.preventDefault();
//         if (!stripe || !elements) return;
//         setLoading(true);
//         setStatus("Processing...");

//         const cardNumberElement = elements.getElement(CardNumberElement);
//         const { error, token } = await stripe.createToken(cardNumberElement);

//         if (error) {
//             setStatus(error.message);
//             setLoading(false);
//         } else {
//             try {
//                 const response = await fetch('httpss://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/payment', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ token: token.id, amount: getTotalCartAmount() }),
//                 });
//                 const data = await response.json();
//                 if (data.success) setStatus("Success! Payment received in Sandbox.");
//                 else setStatus("Payment Failed: " + data.message);
//             } catch (err) {
//                 setStatus("Server Error. Please try again.");
//             }
//             setLoading(false);
//         }
//     };

//     return (
//         <div className='checkout-container'>
//             <div className="checkout-box">
//                 <h2>Sandbox Payment</h2>
//                 <p>Total Amount: ${getTotalCartAmount()}</p>
//                 <form onSubmit={handlePayment}>
//                     <div className="input-group">
//                         <label>Card Number</label>
//                         {/* --- 2. PLACE THE ELEMENTS HERE --- */}
//                         <CardNumberElement className="stripe-input" options={inputStyle} />
//                     </div>
//                     <div className="input-row">
//                         <div className="input-group">
//                             <label>Expiry Date</label>
//                             <CardExpiryElement className="stripe-input" options={inputStyle} />
//                         </div>
//                         <div className="input-group">
//                             <label>CVC</label>
//                             <CardCvcElement className="stripe-input" options={inputStyle} />
//                         </div>
//                     </div>
//                     <button className="pay-button" disabled={loading || !stripe}>
//                         {loading ? "Verifying..." : "Pay Now"}
//                     </button>
//                 </form>
//                 {status && <p className="status-msg">{status}</p>}
//             </div>
//         </div>
//     );
// };

// export default CheckOut;
















import React, { useContext, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ShopContext } from '../../Context/ShopContext';
import './CheckOut.css';

const CheckOut = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { getTotalCartAmount, clearCart } = useContext(ShopContext);
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState(null);

    const handlePayment = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setIsProcessing(true);
        setPaymentError(null);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            setPaymentError(error.message);
            setIsProcessing(false);
            return;
        }

        const authToken = localStorage.getItem('auth-token');
        if (!authToken) {
            alert("Please login to proceed.");
            setIsProcessing(false);
            return;
        }

        try {
            const response = await fetch('httpss://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': authToken 
                },
                body: JSON.stringify({
                    token: paymentMethod.id,
                    amount: getTotalCartAmount()
                })
            });

            const data = await response.json();

            if (data.success) {
                alert("Payment Successful!");
                clearCart(); 
                window.location.replace("/");
            } else {
                setPaymentError(data.message || "Payment declined.");
                setIsProcessing(false);
            }
        } catch (err) {
            setPaymentError("Server connection error.");
            setIsProcessing(false);
        }
    };

    return (
        <div className='checkout-container'>
            <h2>Checkout</h2>
            <div className="checkout-summary">
                <p>Total to Pay: <strong>${getTotalCartAmount()}</strong></p>
            </div>
            <form onSubmit={handlePayment} className="payment-form">
                <label>Card Details</label>
                <div className="card-element-wrapper">
                    <CardElement />
                </div>
                {paymentError && <div className="error-message">{paymentError}</div>}
                <button type="submit" disabled={!stripe || isProcessing}>
                    {isProcessing ? "Processing..." : `Pay $${getTotalCartAmount()}`}
                </button>
            </form>
        </div>
    );
};

export default CheckOut;