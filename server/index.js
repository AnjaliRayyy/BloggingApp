const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const connectDB=require("./config.js/db")
const PORT = process.env.PORT || 5000;
const URI=process.env.URI;

//Middlewares

//Routes
app.get('/', (req, res) => {
    res.send(`<h1>Welcome to the Blogging App API</h1>`);
});

//MongoDB Connection
connectDB(URI)
.then(()=>{
    console.log('Connected to MongoDB');
}).catch((error)=>{
    console.error('Error connecting to MongoDB:', error);
});

//Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});