const express = require('express');
const morgan = require('morgan');
const cors = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');




dotenv.config()


//mongo Connection
connectDB()


const app = express();


//middleawre
app.use(cors)
app.use(express.json())
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}))

const PORT = process.env.PORT || 8050
app.listen(PORT,()=>{
    console.log(`Server is running in dev mode on port ${PORT}`)
})