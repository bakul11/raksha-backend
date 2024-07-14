const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');


//Dot Env File 
require('dotenv').config();


// Middleware 
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));


app.get('/', (req, res) => {
    res.send('Hello Raksa Api')
})


const connectDB = require('./configration/connectDB');

// All Routes Import Here 
const authRoute = require('./Routes/authRoute');
const contactRoute = require('./Routes/contactRoute');
const gallRoute = require('./Routes/gallRoute');
const reviewRoute = require('./Routes/reviewRoute');
const noticeRoute = require('./Routes/noticeRoute');


// Auth Route 
app.use('/auth', authRoute)


// Contact Route 
app.use('/contact', contactRoute)

// Gallery Route 
var path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use('/gallery', gallRoute)



// Review Route 
app.use('/review', reviewRoute)

// Notice Route 
app.use('/notice', noticeRoute)

app.listen(port, () => {
    console.log(`server start port ${port} success`);
    // Database connect Here 
    connectDB();
})