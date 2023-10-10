require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const AuthRoutes = require('./routes/AuthRoutes')

/**
 * APP
 */
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5174']
}))



/**
 * DATABASE
 */
mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.once('connected', () => console.log('DATABASE CONNECTED'));
mongoose.connection.on('error', (er) => console.log("DATABASE ERROR :", er))


/**
 * ROUTES
 */
app.use('/health', (req, res) => res.send('Event Spark Backend is healthy'))
app.use('/api/v1/auth', AuthRoutes);


/**
 * LISTEN
 */
app.listen(process.env.APP_PORT, () => console.log(`APP LISTENING ON PORT :${process.env.APP_PORT}`))