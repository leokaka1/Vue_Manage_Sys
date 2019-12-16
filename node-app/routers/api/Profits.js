const express = require('express')
const passport = require('passport')
const router = express.Router()

const Profits = require('../../models/Profits')

/**
 * @api {post} /api/profits/add 添加信息
 * @apiDescription 添加信息
 * @apiName add
 * @apiGroup Profits
 * @apiSuccess {string} code 状态码 0：失败 1：成功
 * @apiSuccess {string} msg 信息返回
 * @apiSuccessExample {json} Success-Response:
 *  {
    "code": 1,
    "msg":"商品添加成功"
}
 * @apiSampleRequest http://localhost:5000/api/profits/add
 * @apiVersion 1.0.0
 */
router.post('/add',passport.authenticate('jwt',{session:false}),async(req,res)=>{
    const profitsFields = {}
    const {type,desc,income,expend,cash,remark} = req.body
    if(type) profitsFields.type = type
    if(type) profitsFields.desc = desc
    if(type) profitsFields.income = income
    if(type) profitsFields.expend = expend
    if(type) profitsFields.cash = cash
    if(type) profitsFields.remark = remark

    const result = await Profits(profitsFields).save()
    // console.log(result)
    if(result){
        res.send({
            code:1,
            msg:"商品添加成功"
        })
    }else{
        res.send({
            code:0,
            msg:"商品添加失败"
        })
    }
})


/**
 * @api {post} /api/profits/edit/:id 修改货品信息
 * @apiDescription 修改货品信息
 * @apiName edit
 * @apiGroup Profits
 * @apiParam id 货品Id
 * @apiSuccess {string} code 状态码 0：失败 1：成功
 * @apiSuccess {string} msg 信息返回
 * @apiSuccessExample {json} Success-Response:
 *  {
    "code": 1,
    "msg":"商品修改成功"
}
 * @apiSampleRequest http://localhost:5000/api/profits/edit/:id
 * @apiVersion 1.0.0
 */
router.post('/edit/:id',passport.authenticate('jwt',{session:false}),async(req,res)=>{
    const profitsFields = {}
    const {type,desc,income,expend,cash,remark} = req.body
    if(type) profitsFields.type = type
    if(type) profitsFields.desc = desc
    if(type) profitsFields.income = income
    if(type) profitsFields.expend = expend
    if(type) profitsFields.cash = cash
    if(type) profitsFields.remark = remark

    const result = await Profits.findOneAndUpdate(
        {_id:req.params.id},
        {$set:profitsFields},
        {new:true}
    )
    if(result){
        res.send({
            code:1,
            msg:"商品修改成功"
        })
    }else{
        res.send({
            code:0,
            msg:"商品修改失败"
        })
    }
})

/**
 * @api {post} /api/profits/ 查询所有物品信息
 * @apiDescription 查询所有信息
 * @apiGroup Profits
 * @apiSuccess {string} code 状态码 0：失败 1：成功
 * @apiSuccess {string} msg 提示信息
 * @apiSuccess {json} data 数据
 * @apiSuccessExample {json} Success-Response:
 *  {
    "code": 1,
    "data": [
        {
            "date": "2019-12-11T05:08:52.868Z",
            "_id": "5df079ec41a5ca68bee9ec9e",
            "type": "优惠券",
            "desc": "购买课程",
            "income": "20",
            "expend": "20",
            "cash": "500",
            "remark": "购买vue全栈课程",
            "__v": 0
        }
    ]
}
 * @apiSampleRequest http://localhost:5000/api/profits/
 * @apiVersion 1.0.0
 */
router.get('/',passport.authenticate('jwt',{session:false}), async (req,res)=>{
    // console.log(req.query)
    // const page = Number(req.query.page)
    // const page_size = Number(req.query.page_size)
    // console.log(page,page_size)
    const result = await Profits.find({})//.skip((page-1) * page_size).limit(page_size)
    // console.log(result)
    if(result){
        res.json({
            code:1,
            data:result
        })
    }else{
        res.json({
            code:0,
            msg:"没有查找到相关信息"
        })
    }
})

/**
 * @api {post} /api/profits/:id 查询单个物品信息
 * @apiDescription 查询单个信息
 * @apiGroup Profits
 * @apiSuccess {string} code 状态码 0：失败 1：成功
 * @apiSuccess {string} msg 提示信息
 * @apiSuccess {json} data 数据
 * @apiSuccessExample {json} Success-Response:
 *  {
    "code": 1,
    "data": [
        {
            "date": "2019-12-11T05:08:52.868Z",
            "_id": "5df079ec41a5ca68bee9ec9e",
            "type": "优惠券",
            "desc": "购买课程",
            "income": "20",
            "expend": "20",
            "cash": "500",
            "remark": "购买vue全栈课程",
            "__v": 0
        }
    ]
}
 * @apiSampleRequest http://localhost:5000/api/profits/:id
 * @apiVersion 1.0.0
 */
router.get('/:id',passport.authenticate('jwt',{session:false}), async (req,res)=>{
    const result = await Profits.findOne({_id:req.params.id})
    
    if(result){
        res.json({
            code:1,
            data:result
        })
    }else{
        res.json({
            code:0,
            msg:"未查询到相关信息"
        })
    }
})

/**
 * @api {post} /api/profits/:id 查询单个物品信息
 * @apiDescription 查询单个信息
 * @apiGroup Profits
 * @apiSuccess {string} code 状态码 0：失败 1：成功
 * @apiSuccess {string} msg 提示信息
 * @apiSuccess {json} data 数据
 * @apiSuccessExample {json} Success-Response:
 *  {
    "code": 1,
    "data": [
        {
            "date": "2019-12-11T05:08:52.868Z",
            "_id": "5df079ec41a5ca68bee9ec9e",
            "type": "优惠券",
            "desc": "购买课程",
            "income": "20",
            "expend": "20",
            "cash": "500",
            "remark": "购买vue全栈课程",
            "__v": 0
        }
    ]
}
 * @apiSampleRequest http://localhost:5000/api/profits/:id
 * @apiVersion 1.0.0
 */
router.delete('/delete/:id',passport.authenticate('jwt',{session:false}), async (req,res)=>{
    const result = await Profits.findOneAndDelete({_id:req.params.id})
    
    if(result){
        res.json({
            code:1,
            msg:"商品删除成功"
        })
    }else{
        res.json({
            code:0,
            msg:"商品删除失败"
        })
    }
})



module.exports = router