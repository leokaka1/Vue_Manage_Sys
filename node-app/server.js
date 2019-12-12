const express = require('express')
const app = express()
const cors = require('cors')

// use MongoDb
const mongoose = require('mongoose')
const dbs = require('./config/keys').dbs

// bodyParser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// passport
const passport = require('passport')
app.use(passport.initialize());

// Connect to Mongodb
mongoose.connect(dbs,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("☆☆☆☆☆☆MONGODB IS CONNECT☆☆☆☆☆☆")
}).catch((err)=>{
    console.log("MongoDb connect fail!!! -----",err)
})

app.use(cors())

// 引入users
const users = require('./routers/api/Users')
app.use('/api/users',users)

// 引入profile
const profits = require('./routers/api/Profits')
app.use('/api/profits',profits)

// passport
require('./config/passport')(passport)

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})