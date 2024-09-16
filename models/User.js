const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchmea = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    }

})


UserSchmea.pre('save', async function (next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next()
})

UserSchmea.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", UserSchmea);
module.exports = User;