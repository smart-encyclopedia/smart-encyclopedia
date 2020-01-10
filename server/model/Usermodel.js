const Mongoose = require('mongoose')
const Schema = Mongoose.Schema
const pass = require('../helper/bcrypt')

const UserSchema = new Schema({
    email: {type: String},
    password: {type: String},
    first_name: {type: String},
    last_name: {type: String}
})

UserSchema.pre('create', function(next){
    pass.hash(this.model.password)
        .then((data)=>{
            this.model.password = data
        })
})


const User = Mongoose.model('User', UserSchema)

module.exports = User