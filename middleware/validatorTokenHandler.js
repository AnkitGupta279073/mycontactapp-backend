const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { constants } = require('../constants');

const validateToken = asynchandler(async(req,res,next)=>{
    let token;
   
    let authHeaderToken = req.headers.authorization || req.headers.Authorization;
    if(authHeaderToken && authHeaderToken.startsWith('Bearer')){
        token = authHeaderToken.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECERT,(err,decode)=>{
            if(err){
                res.status(constants.UNAUTHORIZE);
                throw new Error('Token not valid');
            }
            req.user = decode.users;
            next();
        });
        
    }else{

        res.status(constants.UNAUTHORIZE);
        throw new Error('Token not valid');

    }
});

module.exports = validateToken;