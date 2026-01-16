import React, { useContext, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { ShopContext } from "../../Context/ShopContext";
import "./CheckOut.css";

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
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setPaymentError(error.message);
      setIsProcessing(false);
      return;
    }

    const authToken = localStorage.getItem("auth-token");
    if (!authToken) {
      alert("Please login to proceed.");
      setIsProcessing(false);
      return;
    }

    try {
      const response = await fetch(
        "https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
          body: JSON.stringify({
            token: paymentMethod.id,
            amount: getTotalCartAmount(),
          }),
        }
      );

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
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-summary">
        <p>
          Total to Pay: <strong>${getTotalCartAmount()}</strong>
        </p>
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
