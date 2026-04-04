const express = require("express");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 6000;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
app.use(express.json());
app.use(cors());
//connect the database with mongoDB
mongoose.connect(process.env.E_CommerceDB_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("DB Error:", err));
// API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running");
});
//Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({ storage: storage })
// creationg upload image
app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    });
});
//Schema for creating products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    new_price: {
        type: Number,
        require: true,
    },
    old_price: {
        type: Number,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    avilable: {
        type: Boolean,
        default: true,
    },
});
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id = 1;
    if (products.length > 0) {
        let lastProduct = products[products.length - 1];
        id = Number(lastProduct.id) + 1;
        if (isNaN(id)) {
            id = 1;
        }
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    });
});
//Creating API for deleting Products
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("removed");
    res.json({
        success: true,
        name: req.body.name,
    });
});
//Creating API for getting  all Products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
});
//Shema cretiong for user model
const Users = mongoose.model("Users", {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
        default: {}
    },
    date: {
        type: Date,
        default: Date.now,
    }
});
// Creationg Endpoint for registering the user
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, error: "existiong user found with same email address" })
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cardData: cart,
    })
    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
});
//Creating emdpoint for user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCampare = req.body.password === user.password;
        if (passCampare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, error: 'Wrong Password' });
        }
    } else {
        res.json({ success: false, error: 'Wrong email address' })
    }
});
//Creating emdpoint for newcollections
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
});
//Creationg endpoint for popular in women category
app.get("/popularinwomen", async (req, res) => {
    let products = await Product.find({ category: "women" });
    let popular_in_women = products.slice(0, 4);
    console.log("Popular in Women Fetched");
    res.send(popular_in_women);
});
//Creationg middelware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "please authenticate using valid token" });
    }
    //here using else case
    try {
        const data = jwt.verify(token, 'secret_ecom');
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ errors: "please authenticate using valid token" });
    }
};
//Creationg endpoint for adding to CartItem
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("BODY:", req.body, req.user);
    let userData = await Users.findOne({ _id: req.user.id });
    const itemId = req.body.itemId || req.body.ItemId;
    if (!itemId) {
        return res.status(400).json({ error: "itemId missing" });
    }
    if (!userData.cartData[itemId]) {
        userData.cartData[itemId] = 0;
    }
    userData.cartData[itemId] += 1;
    await Users.findOneAndUpdate(
        { _id: req.user.id },
        { cartData: userData.cartData }
    );
    res.send("Added");
});
//Creation endpoint to remove product from cartdata
app.post("/removefromcart", fetchUser, async (req, res) => {
    console.log("BODY:", req.body);
    let userData = await Users.findOne({ _id: req.user.id });
    const itemId = req.body.itemId || req.body.ItemId;
    if (!itemId) {
        return res.status(400).json({ error: "itemId missing" });
    }
    if (!userData.cartData) {
        userData.cartData = userData.cardData || {};
    }
    if (userData.cartData[itemId] > 0) {
        userData.cartData[itemId] -= 1;
    }
    await Users.findOneAndUpdate(
        { _id: req.user.id },
        { cartData: userData.cartData }
    );
    res.send("Removed");
});

app.post("/getcart", fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
});
app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server Running on the Port :  ${PORT}`);
    }
    else {
        console.log("Server show the error e : " + error);
    }
});

