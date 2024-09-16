const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt')

exports.register = async (req, res) => {

    const {userName, email, password} = req.body;

    try{
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: 'Usuário já existe'})
        }

        user = new User({
            userName, email, password
        });
        await user.save();
        res.status(201).json({message: 'Usuário criado com sucesso!'})

    } catch(erro) {
        res.status(500).json({error: erro.message});
    }
};

exports.login = async (req, res) =>{
    const {email, password} = req.body; 

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: 'Usuário não encontrado'})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Senha incorreta'});
        }

        const token = jwt.sign({userId: user._id}, config.secret, {expiresIn: '3h'});

        res.status(200).json({token, message: 'Login bem-sucedido'});

    }catch(erro) {
        res.status(500).json({error: erro.message})
    }

}