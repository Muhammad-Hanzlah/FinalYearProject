require("dotenv").config();
const port = process.env.PORT || 8000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");


const paymentLogic = require("./payment");

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { OAuth2Client } = require('google-auth-library');

app.use(express.json());
app.use(cors());
app.use("/images", express.static("upload/images"));

mongoose
  .connect(
    "mongodb+srv://Hanzalo:Pakistan%40431@cluster0.scoor7b.mongodb.net/e-commerce"
  )
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// --- Image Upload Logic ---
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/images/${req.file.filename}`,
  });
});

// --- Schemas ---
const Product = mongoose.model("Product", {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  new_price: { type: Number, required: true },
  old_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

const Users = mongoose.model("Users", {
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: { type: Object },
  // Change this from Array to Object
  interests: { type: Object, default: {} },
  date: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
  otp: { type: String },
});



// --- Middleware ---
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send({ errors: "Please authenticate" });
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Invalid token" });
  }
};

// --- API Routes ---
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;
  const product = new Product({ ...req.body, id });
  await product.save();
  res.json({ success: true, name: req.body.name });
});
// Make sure this matches exactly: /removeproduct
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  res.json(products);
});

app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  res.json(products.slice(1).slice(-8));
});

app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  res.json(products.slice(0, 4));
});
app.post("/relatedproducts", async (req, res) => {
  const { category, id } = req.body;
  try {
    // Find 4 products in the same category, but EXCLUDE the current product
    const products = await Product.find({
      category: category,
      id: { $ne: id }, // $ne means "Not Equal" - prevents showing the same product
      available: true,
    }).limit(4);
    res.json(products);
  } catch (error) {
    res.status(500).send("Error fetching related products");
  }
});
// --- AUTH ROUTES ---
app.post("/signup", async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    if (user && !user.isVerified) {
      user.otp = otp;
      await user.save();
    } else if (user && user.isVerified) {
      return res
        .status(400)
        .json({ success: false, errors: "Existing verified user found" });
    } else {
      let cart = {};
      for (let i = 0; i < 301; i++) {
        cart[i] = 0;
      }
      user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
        otp: otp,
      });
      await user.save();
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    transporter.sendMail(
      {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Verify your E-commerce Account",
        text: `Your verification code is: ${otp}`,
      },
      (error) => {
        if (error) return res.json({ success: false, message: "Email failed" });
        res.json({ success: true, message: "OTP sent to email" });
      }
    );
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

app.post("/verify-otp", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user && user.otp === req.body.otp) {
    await Users.findOneAndUpdate(
      { email: req.body.email },
      { isVerified: true, otp: "" }
    );
    res.json({ success: true, message: "Account Verified Successfully" });
  } else {
    res.json({ success: false, message: "Invalid OTP" });
  }
});

app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user && req.body.password === user.password) {
    if (!user.isVerified)
      return res.json({
        success: false,
        errors: "Please verify your email first",
      });
    const token = jwt.sign({ user: { id: user.id } }, "secret_ecom");
    res.json({ success: true, token });
  } else {
    res.json({ success: false, errors: "Wrong Credentials" });
  }
});

// --- FORGOT PASSWORD ROUTES ---
app.post("/forgot-password", async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    transporter.sendMail(
      {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Password Reset OTP",
        text: `Your password reset code is: ${otp}`,
      },
      (error) => {
        if (error) return res.json({ success: false, message: "Email failed" });
        res.json({ success: true, message: "Reset OTP sent to email" });
      }
    );
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

app.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await Users.findOne({ email });

    if (user && user.otp === otp) {
      user.password = newPassword;
      user.otp = ""; // Clear OTP after success
      await user.save();
      res.json({ success: true, message: "Password updated successfully" });
    } else {
      res.json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// --- Cart & Payment ---
app.post("/getcart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

app.post("/addtocart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added");
});

app.post("/removefromcart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Removed");
});

app.post("/payment", fetchUser, async (req, res) => {
  try {
    const result = await paymentLogic(req.body.token, req.body.amount);
    if (result.status === "succeeded" || result.id) {
      let cart = {};
      for (let i = 0; i < 301; i++) {
        cart[i] = 0;
      }
      await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: cart });
      res.json({ success: true, paymentId: result.id });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// NEW ROUTE: Search functionality using MongoDB Regex
app.get("/search/:key", async (req, res) => {
  try {
    let result = await Product.find({
      $or: [
        { name: { $regex: req.params.key, $options: "i" } }, // 'i' makes it case-insensitive
        { category: { $regex: req.params.key, $options: "i" } },
      ],
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: "Search failed" });
  }
});

// --- UPDATED CHATBOT CODE ---
app.post("/chatbot", async (req, res) => {
  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    const storeInfo = {
      name: "Hanzala's Fashion Store",
      shipping:
        "Free shipping on orders over $50. Otherwise, it's $5 flat rate.",
      returns:
        "15-day easy returns if tags are attached. No returns on 'Final Sale' items.",
      categories: "Mens, Womens, and Kids clothing.",
      featured: "Sporty Cotton T-shirts and Elegant Summer Dresses.",
    };

    const systemInstruction = `You are the official AI Assistant for ${storeInfo.name}.
        RULES:
        1. Only answer questions about our products and policies.
        2. Shipping Policy: ${storeInfo.shipping}
        3. Return Policy: ${storeInfo.returns}
        4. Categories: ${storeInfo.categories}
        5. Featured Items: ${storeInfo.featured}
        6. Always greet customers warmly when they say hi or hy.
        7. If asked about non-store topics, politely decline.
        8. Keep all responses friendly and under 3 sentences.`;

    // FIX: Reverted to the working gemini-2.5-flash model on the stable v1 URL
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemInstruction}\n\nCustomer Message: ${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    // Safety check to ensure candidates[0] exists before reading
    if (
      data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content
    ) {
      const replyText = data.candidates[0].content.parts[0].text;
      res.json({ success: true, reply: replyText });
    } else {
      console.error("AI Response Issue:", JSON.stringify(data));
      res.json({
        success: true,
        reply:
          "Hello! I can help you with questions about our Mens, Womens, and Kids collections. What are you looking for?",
      });
    }
  } catch (error) {
    console.error("Chatbot Error:", error.message);
    res
      .status(500)
      .json({
        success: false,
        reply: "I'm having a small technical glitch. Try again!",
      });
  }
});
// --- END OF CHATBOT CODE ---

// 1. Route to Record User Interests
app.post("/update-interests", fetchUser, async (req, res) => {
  try {
    const { category } = req.body;
    const user = await Users.findById(req.user.id);

    // Use an empty object if interests don't exist yet
    let currentInterests = user.interests || {};

    // Increase the score: if they click 'men', 'men' goes from 1 to 2
    currentInterests[category] = (currentInterests[category] || 0) + 1;

    // Save the updated object back to MongoDB
    await Users.findByIdAndUpdate(req.user.id, { interests: currentInterests });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// 2. Route to Get Personalized Recommendations
// Note: We removed the 'fetchUser' middleware to allow guests to access this
app.get("/recommendations", async (req, res) => {
  try {
    const token = req.header("auth-token");
    let products = [];

    if (token) {
      const data = jwt.verify(token, "secret_ecom");
      const user = await Users.findOne({ _id: data.user.id });

      if (user && user.interests && Object.keys(user.interests).length > 0) {
        // Sort interests to find the favorite (highest score)
        const favoriteCategory = Object.entries(user.interests).sort(
          (a, b) => b[1] - a[1]
        )[0][0];

        // Show products ONLY from that favorite category
        products = await Product.find({
          category: favoriteCategory,
          available: true,
        }).limit(4);
      }
    }

    // Fallback if guest or no data
    if (products.length === 0) {
      products = await Product.find({ available: true })
        .sort({ date: -1 })
        .limit(4);
    }
    res.json(products);
  } catch (error) {
    res.status(500).send("Error");
  }
});
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// GOOGLE LOGIN ENDPOINT
app.post('/google-login', async (req, res) => {
    try {
        const { token } = req.body;
        
        // 1. Verify the Google ID Token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        
        const { email, name, picture } = ticket.getPayload();

        // 2. Check if user already exists in MongoDB
        let user = await Users.findOne({ email: email });

        if (!user) {
            // 3. Create new user if they don't exist
            user = new Users({
                name: name,
                email: email,
                image: picture, // Optional: save their profile pic
                password: Math.random().toString(36).slice(-10), // Secure placeholder
                cartData: Array(301).fill(0), // Initialize cart if needed
                interests: {}, 
            });
            await user.save();
        }

        // 4. Generate your App's JWT Token for the session
        const data = { user: { id: user.id } };
        const authToken = jwt.sign(data, 'secret_ecom');
        
        res.json({ success: true, token: authToken });
    } catch (error) {
        console.error("Google Verification Error:", error);
        res.status(400).json({ success: false, message: "Invalid Google Token" });
    }
});
// Your existing app.listen should be the very last thing
app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error : " + error);
  }
});
