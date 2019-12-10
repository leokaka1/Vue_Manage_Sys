// @login & @register
const express = require('express')
const router = express.Router()


router.get('/test',(req,res)=>{
    res.json({
        msg:'user login works'
    })
})

module.exports = router