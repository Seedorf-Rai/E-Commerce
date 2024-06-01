const mongoose = require('mongoose')
const colors = require('colors')

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Database Connected'.bgGreen.black)
}).catch(() => {
    console.log('Database Failure'.bgRed.white)
})