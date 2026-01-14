require("dotenv").config();
const express = require("express");
const cors = require("cors");
const payment = require('./payment');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Payment Endpoint
app.post('/payment', async (req, res, next) => {
    const { token, amount } = req.body;

    try {
        // Validation: Ensure token and amount are present
        if (!token || !amount) {
            return res.status(400).json({ success: false, message: "Token and Amount are required" });
        }

        const result = await payment(token, amount);
        
        console.log("Payment Successful:", result.id);
        res.status(200).json({
            success: true,
            message: 'Payment success',
            paymentId: result.id
        });

    } catch (error) {
        next(error); // Pass error to the error-handling middleware
    }
});

// Error Handling Middleware
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    res.status(statusCode).json({ success: false, message: message });
});

// Start Server
const PORT = process.env.PORT || 6060;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});