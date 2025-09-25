const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB=require("./config/db");
const cookieParser=require("cookie-parser")

//Environment Variables
const PORT = process.env.PORT || 5000;
const URI=process.env.URI;

//Importing Router
const userRouter=require('./routes/user.js')
const blogRouter=require('./routes/blog.js')
const commentRouter=require('./routes/comment.js')

//<---------------------------Middlewares---------------------------->
app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your client URL
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded())
app.use(cookieParser());

//<------------------------------Routes---------------------------->
app.use('/user',userRouter)
app.use('/blog',blogRouter)
app.use('/comment',commentRouter)

//<-------------------------MongoDB Connection-------------------->
connectDB(URI)
.then(()=>{
    console.log('Connected to MongoDB');
}).catch((error)=>{
    console.error('Error connecting to MongoDB:', error);
});

//<------------------------Starting the server---------------------->
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
