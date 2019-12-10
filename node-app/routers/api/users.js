// @login & @register
const express = require('express')
const router = express.Router()

/**
 * @api {get} /api/users/test 用户测试
 * @apiDescription 用户测试
 * @apiName test
 * @apiGroup Users
 * @apiSuccess {json} msg
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "msg":"返回成功"
 *  }
 * @apiSampleRequest http://localhost:5000/api/users/test
 * @apiVersion 1.0.0
 */
router.get('/test',(req,res)=>{
    res.json({
        msg:'user login works'
    })
})


router.post('')

module.exports = router