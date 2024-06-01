const express = require('express');
const userRoutes = require('./routes/user');
const app = express()
const colors = require('colors')
const PORT = process.env.PORT||8000
const cookieParser = require('cookie-parser');
require('./config/database');
require('dotenv').config()


app.use(express.json())
app.use(cookieParser());
app.use('/' , userRoutes);




//Server Listening
app.listen(PORT , ()=>{console.log(`SERVER STARTED : http://localhost:${PORT}`.black.bgGreen)})