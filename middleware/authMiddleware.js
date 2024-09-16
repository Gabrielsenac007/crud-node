const jwt = require('jsonwebtoken');
const config = require('../config/jwt')
const User = require('../models/User')

module.exports = async  (req, res, next) =>{
    const authHeader = req.header('Authorization');
    if(!authHeader){
        return res.status(401).json({message: 'Usuário não autorizado'})
    }

    const token = authHeader.split(' ')[1];
    if(!token){
    return res.status(401).json({message: 'Usuário negado'})
    }

    try{
        const decode = jwt.verify(token, config.secret);
        console.log('decode:', decode )

        const user = await User.findById(decode.userId);
        if(!user){
            return res.status(401).json({message: 'Usuário sem permissão'})
        } 
        req.user = user;
        next()
    } catch (err){
        res.status(401).json({message: 'Token não é válido', error:err.message})

    }
}