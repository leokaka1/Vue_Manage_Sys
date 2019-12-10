const express = require('express')
const app = express()

// use MongoDb
const mongoose = require('mongoose')
const dbs = require('./config/keys').dbs

// Connect to Mongodb
mongoose.connect(dbs,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("☆☆☆☆☆☆MONGODB IS CONNECT☆☆☆☆☆☆")
}).catch((err)=>{
    console.log("MongoDb connect fail!!! -----",err)
})

const users = require('./routers/api/users')
app.use('/api/users',users)

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})