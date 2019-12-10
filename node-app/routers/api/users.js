// @login & @register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const secret = require("../../config/keys").secret;
const User = require("../../models/Users");

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
router.get("/test", (req, res) => {
  res.json({
    msg: "user login works"
  });
});

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
router.post("/register", async (req, res) => {
  console.log("请求注册接口", req.body);
  // 查询数据库中是否拥有邮箱
  const result = await User.findOne({ email: req.body.email });
  if (result) {
    res.json({
      code: 0,
      msg: "邮箱已被注册！"
    });
  } else {
    // 获取头像
    const avatar = gravatar.url(req.body.email, { s: "200", r: "pg", d: "mm" });
    // 获取body中的值
    const newUsers = new User({
      name: req.body.name,
      email: req.body.email,
      avatar,
      password: req.body.password
    });

    // 盐值
    const saltRounds = 10;
    // 加密
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(newUsers.password, salt, async (err, hash) => {
        if (err) throw err;
        newUsers.password = hash;
        // 存储到数据库
        const result = await newUsers.save();
        if (result) {
          res.json({
            code: 1,
            result
          });
        }
      });
    });
  }
});

/**
 * @api {post} /api/users/login 用户登录
 * @apiDescription 用户登录
 * @apiName login
 * @apiGroup login
 * @apiParam {string} email 邮箱
 * @apiParam {string} password 密码
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
      "code": 1,
      "msg": "登录成功！",
      "token": "leoneyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzU5Njc4MTksImV4cCI6MTU3NTk3MTQxOX0.8c4kOpvKBNKBh8UQuH44KBF2DuVGnEHTbpeOI5le_dU"
    }
 * @apiSampleRequest http://localhost:5000/api/users/login
 * @apiVersion 1.0.0
 */
router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const result = await User.findOne({ email });
  //   console.log(result)
  if (!result) {
    res.json({
      code: 0,
      msg: "用户不存在!"
    });
  } else {
    // 密码匹配
    bcrypt.compare(password, result.password, (err, result) => {
      // res == true
      // 匹配成功
      if (result) {
        // 使用 json web token
        const rule = { id: result._id, name: result.name };
        // 规则，名称，过期时间
        jwt.sign(rule, secret, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({
            code: 1,
            msg: "登录成功！",
            token: "leon" + token
          });
        });
      } else {
        res.json({
          code: 0,
          msg: "登录密码错误！"
        });
      }
    });
  }
});



router.get('/current', async (req,res)=>{
    
})

module.exports = router;
