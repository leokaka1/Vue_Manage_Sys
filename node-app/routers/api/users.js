// @login & @register
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../../models/Users')

/**
 * @api {get} /api/users/test 用户测试
 * @apiDescription 用户测试
 * @apiName test
 * @apiGroup login
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

/**
 * @api {post} /api/users/register 用户注册
 * @apiDescription 用户注册
 * @apiName register
 * @apiGroup login
 * @apiParam {string} name 用户名
 * @apiParam {string} email 邮箱
 * @apiParam {string} password 密码
 * @apiParam {string} avatar 头像
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code":"1",
 *      "result": {
            "date": "2019-12-10T07:58:35.485Z",
            "_id": "5def5064f39c7025b3c8840f",
            "name": "leon",
            "email": "leocaoxiaozhu1@163.com",
            "password": "$2b$10$Cu0GmZDk8mKUvQbj8BhVnOkiLPZ7/vEa5xsC7GUeyjIkZy2LFd5AK",
            "__v": 0
        }
 *  }
 * @apiSampleRequest http://localhost:5000/api/users/register
 * @apiVersion 1.0.0
 */
router.post('/register',async (req,res)=>{
    console.log("请求注册接口",req.body)
    // 查询数据库中是否拥有邮箱
    const result = await User.findOne({email:req.body.email})
    if(result){
        res.json({
            code:1,
            msg:'邮箱已被注册！'
        })
    }else{
        const newUsers = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })

        // 盐值
        const saltRounds = 10;
        // 加密
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(newUsers.password, salt, async(err, hash) =>{
                if(err) throw err
                newUsers.password = hash
                // 存储到数据库
                const result = await newUsers.save()
                if(result){
                    res.json({
                        code:0,
                        result
                    })
                }
            });
        });

    }
})

module.exports = router