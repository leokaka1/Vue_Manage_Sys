const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose=require('mongoose');
const User=mongoose.model('users')
const keys = require('../config/keys')


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
        // console.log(jwt_payload)
        // 查找对应的用户
        const user = User.findOne(jwt_payload.id)
        if(user){
            done(null,user)
        }else{
            done(null,false)
        }
    }));
}