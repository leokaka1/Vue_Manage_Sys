// @login & @register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const secret = require("../../config/keys").secret;
const passport = require('passport')
const User = require("../../models/Users");

/**
 * @api {post} /api/users/register 用户注册
 * @apiDescription 用户注册
 * @apiName register
 * @apiGroup login
 * @apiParam {string} name 用户名
 * @apiParam {string} email 邮箱
 * @apiParam {string} password 密码
 * @apiParam {string} avatar 头像
 * @apiSuccess {string} code 状态码 0：失败 1：成功
 * @apiSuccess {string} msg 信息返回
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "code":"1",
 *      "msg": "用户注册成功"
 *  }
 * @apiSampleRequest http://localhost:5000/api/users/register
 * @apiVersion 1.0.0
 */
router.post("/register", async (req, res) => {
  console.log("请求注册接口", req.body);
  // 查询数据库中是否拥有邮箱
  const result = await User.findOne({$or:[{email: req.body.email },{username:req.body.username}]});
  if (result) {
    res.json({
      code: 0,
      msg: "邮箱或用户名已被注册！"
    });
  } else {
    // 获取头像
    const avatar = gravatar.url(req.body.email, { s: "200", r: "pg", d: "mm" });
    // 获取body中的值
    const newUsers = new User({
      name: req.body.name,
      email: req.body.email,
      avatar,
      password: req.body.password,
      identity:req.body.identity,
      username:req.body.username
    });

    // 存储用户到数据库
    const result = await newUsers.save()
    if(result){
      res.json({
        code: 1,
        msg:"用户注册成功"
      });
    }else{
      res.json({
        code: 0,
        msg:"用户注册失败"
      });
    }

    // 盐值
    // const saltRounds = 10;
    // 加密
    // bcrypt.genSalt(saltRounds, function(err, salt) {
    //   bcrypt.hash(newUsers.password, salt, async (err, hash) => {
    //     if (err) throw err;
    //     newUsers.password = hash;
    //     // 存储到数据库
    //     let [error,result] = await newUsers.save();
    //     // 验证
    //     // console.log(result)
    //     if (!error) {
    //       res.json({
    //         code: 1,
    //         msg:"用户注册成功"
    //       });
    //     }else{
    //       // console.log("err",err)
    //     }
    //   });
    // });
  }
});

/**
 * @api {post} /api/users/login 用户登录
 * @apiDescription 用户登录
 * @apiName login
 * @apiGroup login
 * @apiParam {string} email 邮箱
 * @apiParam {string} password 密码
 * @apiSuccess {string} code 状态码 0：失败 1：成功
 * @apiSuccess {string} msg 结果信息
 * @apiSuccess {string} token 获取Token值
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
  const username = req.body.username;
  const password = req.body.password;

  const searchResult = await User.findOne({ username });
  // console.log(searchResult)
  if (!searchResult) {
    res.json({
      code: 0,
      msg: "用户不存在!"
    });
  }else if(searchResult.access == false){
    res.json({
      code: 0,
      msg: "用户正在审核中，请稍后再试！"
    });
  }else {
    // 密码匹配
    // bcrypt.compare(password, searchResult.password, (err, result) => {
      
    // });
      // 匹配成功
      if (password == searchResult.password) {
        // 使用 json web token
        // 把用户信息传入
        const {_id,email,name,avatar,identity,access} = searchResult
        const rule = { 
          id: _id,
          email,
          name,
          avatar,
          identity,
          access
        };
        // 设置JWT规则，名称，过期时间
        jwt.sign(rule, secret, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({
            code: 1,
            msg: "登录成功！",
            token: "Bearer " + token,
            data:rule
          });
        });
      } else {
        res.json({
          code: 0,
          msg: "登录密码错误！"
        });
      }
  }
});


/**
 * @api {post} /api/users/current 获取用户信息
 * @apiDescription 获取用户信息
 * @apiName current
 * @apiGroup login
 * @apiSuccess {json} code 状态码 0：失败 1：成功
 * @apiSuccess {json} result 返回结果
 * @apiSuccess {string} id 用户Id
 * @apiSuccess {string} name 用户姓名
 * @apiSuccess {string} email 用户邮箱
 * * @apiSuccess {string} identity 用户权限
 * @apiSuccessExample {json} Success-Response:
 *  {
        "code": 1,
        "result": {
            "id": "5def53908db57832e872dfac",
            "name": "leon",
            "email": "leocaoxiaozhu@163.com"
            "identity": "leocaoxiaozhu@163.com"
        }
    }
}
 * @apiSampleRequest http://localhost:5000/api/users/current
 * @apiVersion 1.0.0
 */
router.get('/current',passport.authenticate("jwt",{session:false}), async (req,res)=>{
    // console.log(req.user)
    const {id,name,email,identity} = req.user
    const userInfo = {
        id,
        name,
        email,
        identity
    }

    res.json({
        code:1,
        result:userInfo
    })
})


// 获取所有的用户除了admin管理员账户之外
router.get('/getUsers',passport.authenticate("jwt",{session:false}), async (req,res)=>{
  console.log("params",req.query)
  const {name} = req.query
  let result = {}
  if(name == ''){
    result = await User.find({"username":{$ne:"admin"}},{__v:0,password:0})
  }else{
    result = await User.find({$and:[{"email":{$ne:"leocaoxiaozhu@163.com"}},{"username":{$regex:name}}]},{__v:0,password:0})
  }
  
  // console.log(result)
  if(result){
    res.json({
        code:1,
        result
    })
  }else{
    res.json({
      code:0,
      msg:"暂无数据"
    })
  }
})

// 开通用户
router.post('/changeUserState/:id',passport.authenticate("jwt",{session:false}), async (req,res)=>{
  // console.log(req.params.id)
  const newAccess = req.body.access
  // console.log(newAccess)
  const result = await User.update({_id:req.params.id},{access:newAccess})
  // console.log(result)
  if(result){
    res.json({
        code:1,
        msg:"用户已开通"
    })
  }else{
    res.json({
      code:0,
      msg:"用户开通失败"
    })
  }
})


module.exports = router;
