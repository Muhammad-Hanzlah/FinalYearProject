// const port = 4000;
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const jwt = require ("jsonwebtoken")
// const multer = require("multer");
// const path = require("path")
// const cors = require("cors");
// const { error } = require("console");
// const { request } = require("http");
// const { type } = require("os");

// app.use(express.json());
// app.use(cors());

// // data base connection with mongodb
// // Replace @ with %40
// mongoose.connect("mongodb+srv://Hanzalo:Pakistan%40431@cluster0.scoor7b.mongodb.net/e-commerce")

// // api creation

// app.get("/",(req,res) =>{
//     res.send("Espress App is Running")
// })


// const storage = multer.diskStorage({
//     destination: './upload /images',
//     filename:(req,file,cb)=>{
//         return cb(null,`${fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// const upload = multer({storage:storage})

// // creating upload endpoint for images

// app.use('/images',express.static('upload/images'))

// app.post("/upload",upload.single('product'),(req,res) =>{
//     res.json({
//         succes:1,
//         image_url:`http://localhost:${port}/images/${req.file.filename}`
//     })
// })

// app.post('/addproduct',async(req,res)=>{
//     const product = new Product({
//         id:req.body.id,
//         name:req.body.name,
//         image:req.body.image,
//         category:req.body.category,
//         new_price:req.body.new_price,
//         old_price:req.body.old_price,
//     })
//     console.log(product);
//     await product.save();
//     console.log("Save");
//     res.json({
//         succes:true,
//         name:req.body.name,
//     })
// })

// //schema for creating products

// const Product = mongoose.model("Product",{
//     id:{
//         type: Number,
//         required:true,
//     },
//     name:{
//         type:String,
//         required:true,
//     },
//     image:{
//         type:String,
//         required:true,
//     },
//     category:{
//         typle:String,
//         required:true,
//     },
//     new_price:{
//         type:Number,
//         required:true,
//     },
//     old_price:{
//         type:Number,
//         required:true,
//     },
//     date:{
//         type:Date,
//         default:Date.now,
//     },
//     avilable:{
//         type:Boolean,
//         default:true,
//     },
// })




// app.listen(port,(error)=>{
//     if (!error){
//         console.log("Server Running On Port" + port)
//     }
//     else{
//         console.log("Error : "+error)
//     }
// })






























// const port = 4000;
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require("path");
// const cors = require("cors");
// const fs = require('fs');
// const { type } = require("os");
// const { error } = require("console");
// const { AsyncResource } = require("async_hooks");
// // At the top of index.js
// const stripe = require("stripe")("sk_test_51SnHBkCtxpb4SCTkAjJ2N8S4rj1Q4RFC7r2RaZbT3aQX5ExTK5gvF378FevQjMH1Lo0csP1zaGCahNWncmhmL2Qu001aOuckZa");

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Database Connection
// mongoose.connect("mongodb+srv://Hanzalo:Pakistan%40431@cluster0.scoor7b.mongodb.net/e-commerce")
//     .then(() => console.log("Connected to MongoDB Atlas"))
//     .catch((err) => console.log("MongoDB Connection Error: ", err));

// // --- Product Schema ---
// const Product = mongoose.model("Product", {
//     id: { type: Number, required: true },
//     name: { type: String, required: true },
//     image: { type: String, required: true },
//     category: { type: String, required: true },
//     new_price: { type: Number, required: true },
//     old_price: { type: Number, required: true },
//     date: { type: Date, default: Date.now },
//     available: { type: Boolean, default: true },
// });

// // --- Image Storage Engine (Absolute Paths) ---
// const uploadDir = path.join(__dirname, 'upload', 'images');

// // This check ensures folders are created only if they don't exist (no duplicates)
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//     }
// });

// const upload = multer({ 
//     storage: storage,
//     limits: { fileSize: 10 * 1024 * 1024 } 
// });

// // --- API Endpoints ---

// app.get("/", (req, res) => {
//     res.send("Express App is Running");
// });

// // Serving static images
// app.use('/images', express.static(uploadDir));

// // 1. Upload Image Endpoint
// app.post("/upload", (req, res) => {
//     upload.single('product')(req, res, (err) => {
//         if (err) {
//             return res.status(500).json({ success: 0, message: err.message });
//         }
//         if (!req.file) {
//             return res.status(400).json({ success: 0, message: "No file provided" });
//         }
//         res.json({
//             success: 1,
//             image_url: `http://localhost:${port}/images/${req.file.filename}`
//         });
//     });
// });

// // 2. Add Product Endpoint (with Auto-ID Logic)
// app.post('/addproduct', async (req, res) => {
//     let products = await Product.find({});
//     let id;
//     if (products.length > 0) {
//         let last_product_array = products.slice(-1);
//         let last_product = last_product_array[0];
//         id = last_product.id + 1;
//     } else {
//         id = 1;
//     }

//     const product = new Product({
//         id: id,
//         name: req.body.name,
//         image: req.body.image,
//         category: req.body.category,
//         new_price: req.body.new_price,
//         old_price: req.body.old_price,
//     });

//     await product.save();
//     console.log("Saved Product:", req.body.name);
//     res.json({ success: true, name: req.body.name });
// });

// // 3. Remove Product Endpoint
// app.post('/removeproduct', async (req, res) => {
//     await Product.findOneAndDelete({ id: req.body.id });
//     console.log("Removed Product ID:", req.body.id);
//     res.json({
//         success: true,
//         name: req.body.name
//     });
// });

// // 4. Get All Products Endpoint
// app.get('/allproducts', async (req, res) => {
//     let products = await Product.find({});
//     console.log("All Products Fetched");
//     res.send(products);
// });

// //user generator

// const Users = mongoose.model('Users',{
//     name:{
//         type:String,
//     },
//     email:{
//         type:String,
//         unique:true,
//     },
//     password:{
//         type:String,
//     },
//     cartData:{
//         type:Object,
//     },
//     data:{
//         type:Date,
//         default:Date.now,
//     }
// })

// app.post('/signup',async(req,res)=>{

//     let check = await Users.findOne({email:req.body.email});
//     if(check){
//         return res.status(400).json({success:false,errors:"existing user found with same email address"})
//     }
//     let cart = {};
//     for (let i = 0; i < 3000; i++) {
//         cart[i] = 0;
//     }
//     const user = new Users({
//         name:req.body.username,
//         email:req.body.email,
//         password:req.body.password,
//         cartData:cart,
//     })

//     await user.save();

//     const data = {
//         user :{
//             id:user.id
//         }
//     }

//     const token = jwt.sign(data, 'secret_ecom');
//     res.json({success:true,token})

// })


// //endpoint of user login

// app.post('/login',async (req,res)=>{
//     let user = await Users.findOne({email:req.body.email});
//     if(user){
//         const passCampare = req.body.password === user.password;
//         if(passCampare){
//             const data = {
//                 user:{
//                     id:user.id
//                 }
//             }
//             const token = jwt.sign(data,'secret_ecom');
//             res.json({success:true,token});
//         }
//          else{
//         res.json({success:false,errors:"Wrong Password"});
//     }
// }
// else{
//     res.json({success:false,errors:"Wrong Email Id"})
// }
   

// })
// app.get('/newcollections', async (req, res) => {
//     // Logic: Fetching all products from the database "memory"
//     let products = await Product.find({});
    
//     // Logic: Selecting the last 8 products to create the "New Collection"
//     let newcollections = products.slice(1).slice(-8);
    
//     console.log("NewCollections Fetched");
    
//     // res.send must use the EXACT variable name defined above
//     res.send(newcollections);
// });

// app.get('/popularinwomen', async (req, res) => {
//     // Logic: Targeting the "women" category specifically
//     let products = await Product.find({category: "women"});
    
//     // Logic: Balancing the view by selecting only the top 4 items
//     let popular_in_women = products.slice(0, 4);
    
//     console.log("Popular in Women Fetched");
//     res.send(popular_in_women); // Logic: Send the sliced data to the frontend
// });





// const fetchUser = async (req, res, next) => {
//     const token = req.header('auth-token'); // Get token from headers
//     if (!token) {
//         res.status(401).send({ errors: "Please authenticate using a valid token" });
//     } else {
//         try {
//             const data = jwt.verify(token, 'secret_ecom'); // Decode the token
//             req.user = data.user;
//             next();
//         } catch (error) {
//             res.status(401).send({ errors: "Please authenticate using a valid token" });
//         }
//     }
// }




// app.post('/addtocart', fetchUser, async (req, res) => {
//     let userData = await Users.findOne({_id: req.user.id});
//     userData.cartData[req.body.itemId] += 1; // Update specific item
//     await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
//     res.send("Added");
// });

// // Add this to your index.js (Backend)
// app.post('/getcart', fetchUser, async (req, res) => {
//     console.log("Fetching Cart Data for User:", req.user.id);
//     let userData = await Users.findOne({_id: req.user.id});
//     // Send the cartData object back to the frontend
//     res.json(userData.cartData);
// });

// app.post('/removefromcart', fetchUser, async (req, res) => {
//     let userData = await Users.findOne({_id: req.user.id});
//     if(userData.cartData[req.body.itemId] > 0)
//     userData.cartData[req.body.itemId] -= 1;
//     await Users.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
//     res.send("Removed");
// });








// // Start Server
// app.listen(port, (error) => {
//     if (!error) {
//         console.log("Server Running On Port " + port);
//     } else {
//         console.log("Error : " + error);
//     }
// });





















// const port = 4000;
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require("path");
// const cors = require("cors");
// const fs = require('fs');

// // NEW: Link to payment logic
// const paymentLogic = require('./payment');

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Database Connection
// mongoose.connect("mongodb+srv://Hanzalo:Pakistan%40431@cluster0.scoor7b.mongodb.net/e-commerce")
//     .then(() => console.log("Connected to MongoDB Atlas"))
//     .catch((err) => console.log("MongoDB Connection Error: ", err));

// // --- Product Schema ---
// const Product = mongoose.model("Product", {
//     id: { type: Number, required: true },
//     name: { type: String, required: true },
//     image: { type: String, required: true },
//     category: { type: String, required: true },
//     new_price: { type: Number, required: true },
//     old_price: { type: Number, required: true },
//     date: { type: Date, default: Date.now },
//     available: { type: Boolean, default: true },
// });

// // --- Image Storage Engine ---
// const uploadDir = path.join(__dirname, 'upload', 'images');
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//     }
// });

// const upload = multer({ storage: storage });

// // --- API Endpoints ---

// app.get("/", (req, res) => {
//     res.send("Express App is Running");
// });

// app.use('/images', express.static(uploadDir));

// app.post("/upload", (req, res) => {
//     upload.single('product')(req, res, (err) => {
//         if (err) return res.status(500).json({ success: 0, message: err.message });
//         res.json({
//             success: 1,
//             image_url: `http://localhost:${port}/images/${req.file.filename}`
//         });
//     });
// });

// app.post('/addproduct', async (req, res) => {
//     let products = await Product.find({});
//     let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;
//     const product = new Product({
//         id: id,
//         name: req.body.name,
//         image: req.body.image,
//         category: req.body.category,
//         new_price: req.body.new_price,
//         old_price: req.body.old_price,
//     });
//     await product.save();
//     res.json({ success: true, name: req.body.name });
// });

// app.post('/removeproduct', async (req, res) => {
//     await Product.findOneAndDelete({ id: req.body.id });
//     res.json({ success: true, name: req.body.name });
// });

// app.get('/allproducts', async (req, res) => {
//     let products = await Product.find({});
//     res.send(products);
// });

// // --- User Schema ---
// const Users = mongoose.model('Users', {
//     name: { type: String },
//     email: { type: String, unique: true },
//     password: { type: String },
//     cartData: { type: Object },
//     date: { type: Date, default: Date.now }
// });

// app.post('/signup', async (req, res) => {
//     let check = await Users.findOne({ email: req.body.email });
//     if (check) return res.status(400).json({ success: false, errors: "Existing user found" });
//     let cart = {};
//     for (let i = 0; i < 300; i++) { cart[i] = 0; }
//     const user = new Users({
//         name: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//         cartData: cart,
//     });
//     await user.save();
//     const data = { user: { id: user.id } };
//     const token = jwt.sign(data, 'secret_ecom');
//     res.json({ success: true, token });
// });

// app.post('/login', async (req, res) => {
//     let user = await Users.findOne({ email: req.body.email });
//     if (user) {
//         if (req.body.password === user.password) {
//             const data = { user: { id: user.id } };
//             const token = jwt.sign(data, 'secret_ecom');
//             res.json({ success: true, token });
//         } else {
//             res.json({ success: false, errors: "Wrong Password" });
//         }
//     } else {
//         res.json({ success: false, errors: "Wrong Email Id" });
//     }
// });

// app.get('/newcollections', async (req, res) => {
//     let products = await Product.find({});
//     let newcollections = products.slice(1).slice(-8);
//     res.send(newcollections);
// });

// app.get('/popularinwomen', async (req, res) => {
//     let products = await Product.find({ category: "women" });
//     let popular_in_women = products.slice(0, 4);
//     res.send(popular_in_women);
// });

// // Auth Middleware
// const fetchUser = async (req, res, next) => {
//     const token = req.header('auth-token');
//     if (!token) return res.status(401).send({ errors: "Please authenticate" });
//     try {
//         const data = jwt.verify(token, 'secret_ecom');
//         req.user = data.user;
//         next();
//     } catch (error) {
//         res.status(401).send({ errors: "Invalid token" });
//     }
// };

// app.post('/addtocart', fetchUser, async (req, res) => {
//     let userData = await Users.findOne({ _id: req.user.id });
//     userData.cartData[req.body.itemId] += 1;
//     await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
//     res.send("Added");
// });

// app.post('/removefromcart', fetchUser, async (req, res) => {
//     let userData = await Users.findOne({ _id: req.user.id });
//     if (userData.cartData[req.body.itemId] > 0)
//         userData.cartData[req.body.itemId] -= 1;
//     await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
//     res.send("Removed");
// });

// app.post('/getcart', fetchUser, async (req, res) => {
//     let userData = await Users.findOne({ _id: req.user.id });
//     res.json(userData.cartData);
// });

// // --- NEW: Payment Route ---
// app.post('/payment', async (req, res) => {
//     const { token, amount } = req.body;
//     try {
//         const result = await paymentLogic(token, amount);
//         res.status(200).json({ success: true, paymentId: result.id });
//     } catch (err) {
//         res.status(500).json({ success: false, message: err.message });
//     }
// });



// // Add this route to your index.js (Backend)
// app.post('/clearcart', fetchUser, async (req, res) => {
//     let cart = {};
//     for (let i = 0; i < 300; i++) { // Match the loop size in your signup route
//         cart[i] = 0;
//     }
//     // Update the user's cartData in the database
//     await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: cart });
//     res.json({ success: true, message: "Cart Cleared in Database" });
// });










//  app.listen(port, (error) => {
//     if (!error) {
//         console.log("Server Running On Port " + port);
//     } else {
//         console.log("Error : " + error);
//     }
// });















// const port = 4000;
const port = process.env.PORT || 8000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const nodemailer = require('nodemailer');

// Import Stripe Logic
const paymentLogic = require('./payment');

app.use(express.json());
app.use(cors());

// Serve images statically
app.use('/images', express.static('upload/images'));


mongoose.connect("mongodb+srv://Hanzalo:Pakistan%40431@cluster0.scoor7b.mongodb.net/e-commerce")
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));

// --- Image Upload Logic for Admin ---
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({ storage: storage });

// app.post("/upload", upload.single('product'), (req, res) => {
//     res.json({
//         success: 1,
//         image_url: `http://localhost:${port}/images/${req.file.filename}`
//     });
// });



app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        // Replace localhost with your actual Koyeb URL
        image_url: `https://fluttering-christiana-muhammadhanzalah-eb04cdbe.koyeb.app/images/${req.file.filename}`
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

// const Users = mongoose.model('Users', {
//     name: { type: String },
//     email: { type: String, unique: true },
//     password: { type: String },
//     cartData: { type: Object },
//     date: { type: Date, default: Date.now }
// });





const Users = mongoose.model('Users', {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: Object },
    date: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false }, // New field
    otp: { type: String } // To store the temporary code
});




const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', 
        pass: 'your-app-password' // Get this from Google Account -> Security
    }
});






// --- Middleware ---
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send({ errors: "Please authenticate" });
    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) { res.status(401).send({ errors: "Invalid token" }); }
};

// --- API Routes ---
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;
    const product = new Product({ ...req.body, id });
    await product.save();
    res.json({ success: true, name: req.body.name });
});







app.post('/removeproduct', async (req, res) => {
    try {
        // This finds the product by the 'id' sent from your frontend and deletes it
        await Product.findOneAndDelete({ id: req.body.id });
        console.log("Product Removed");
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, message: "Failed to remove product" });
    }
});







app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    res.json(products);
});

app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    res.json(products.slice(1).slice(-8));
});

app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({ category: "women" });
    res.json(products.slice(0, 4));
});

app.get('/relatedproducts/:id/:category', async (req, res) => {
    const { id, category } = req.params;
    let related = await Product.find({ category: category, id: { $ne: id } }).limit(4);
    res.json(related);
});

// Auth & Cart
// app.post('/signup', async (req, res) => {
//     let check = await Users.findOne({ email: req.body.email });
//     if (check) return res.status(400).json({ success: false, errors: "Existing User" });
//     let cart = {}; for (let i = 0; i < 301; i++) { cart[i] = 0; }
//     const user = new Users({ ...req.body, cartData: cart });
//     await user.save();
//     const token = jwt.sign({ user: { id: user.id } }, 'secret_ecom');
//     res.json({ success: true, token });
// });








app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) return res.status(400).json({ success: false, errors: "Existing user found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    let cart = {};
    for (let i = 0; i < 300; i++) { cart[i] = 0; }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
        otp: otp
    });

    await user.save();

    // Send the Email
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: user.email,
        subject: 'Verify your E-commerce Account',
        text: `Your verification code is: ${otp}`
    };

    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS 
    }
});
});






app.post('/verify-otp', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user && user.otp === req.body.otp) {
        await Users.findOneAndUpdate({ email: req.body.email }, { isVerified: true, otp: "" });
        res.json({ success: true, message: "Account Verified Successfully" });
    } else {
        res.json({ success: false, message: "Invalid OTP" });
    }
});







// app.post('/login', async (req, res) => {
//     let user = await Users.findOne({ email: req.body.email });
//     if (user && req.body.password === user.password) {
//         const token = jwt.sign({ user: { id: user.id } }, 'secret_ecom');
//         res.json({ success: true, token });
//     } else { res.json({ success: false, errors: "Wrong Credentials" }); }
// });






app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            // Check if verified
            if (!user.isVerified) {
                return res.json({ success: false, errors: "Please verify your email first" });
            }
            // If verified, proceed with JWT token
            const data = { user: { id: user.id } };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    } else {
        res.json({ success: false, errors: "Wrong Email Id" });
    }
});





app.post('/getcart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({_id: req.user.id});
    res.json(userData.cartData);
});

app.post('/addtocart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.json({ success: true });
});

app.post('/removefromcart', fetchUser, async (req, res) => {
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId] > 0) userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.json({ success: true });
});

app.post('/payment', fetchUser, async (req, res) => {
    try {
        const result = await paymentLogic(req.body.token, req.body.amount);
        if (result.status === 'succeeded' || result.id) {
            let cart = {}; for (let i = 0; i < 301; i++) { cart[i] = 0; }
            await Users.findOneAndUpdate({_id:req.user.id}, {cartData: cart});
            res.json({ success: true, paymentId: result.id });
        }
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
});

// app.listen(port, (error) => { if (!error) console.log("Server Running on Port " + port); });
app.listen(port, "0.0.0.0", (error) => {
    if (!error) {
        console.log("Server Running on Port " + port);
    } else {
        console.log("Error: " + error);
    }
});