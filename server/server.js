const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRouths');
const openaiRoutes = require('./routes/openaiRoutes');
const errorHandler = require('./middlewares/errorMiddleware');



// Load env vars
dotenv.config();

// Connect to DB
connectDB();

// App init
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/openai', openaiRoutes);
// Error middleware (last)
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 8050;
app.listen(PORT, () => {
  console.log(`Server is running in dev mode on port ${PORT}`);
});
