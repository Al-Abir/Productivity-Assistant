const express = require('express');
const morgan = require('morgan');
const cors = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRouths');
const errorHandler = require('./middlewares/errorMiddleware');



dotenv.config()


//mongo Connection
connectDB()


const app = express();


//middleawre
app.use(cors)
app.use(express.json())
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(errorHandler)

const PORT = process.env.PORT || 8050


app.use('/api/v1/auth',authRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running in dev mode on port ${PORT}`)
})