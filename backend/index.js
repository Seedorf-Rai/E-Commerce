const express = require('express');
const userRoutes = require('./routes/user');
const app = express()
const colors = require('colors')
const PORT = process.env.PORT||8000
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('./config/database');
require('dotenv').config()

app.use(cors({credentials:true , origin: 'http://localhost:5173'}))

app.use(express.json())
app.use(cookieParser());
app.use('/' , userRoutes);



//Server Listening
app.listen(PORT , ()=>{console.log(`SERVER STARTED : http://localhost:${PORT}`.black.bgGreen)})