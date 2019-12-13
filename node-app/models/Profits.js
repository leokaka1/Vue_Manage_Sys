const mongoose = require('mongoose')
const ProfitSchema = new mongoose.Schema({
    type:{
        type:String,
    },
    desc:{
        type:String,
    },
    income:{
        type:String,
        required:true
    },
    expend:{
        type:String,
        required:true
    },
    cash:{
        type:String,
        required:true
    },
    remark:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    },
})

module.exports = Profits = mongoose.model('profits',ProfitSchema)