const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true,
            minlength: 6
        },
        tasks:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Todo'
        }]   
    },{timestamps: true}
);

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }

    try{
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password,saltRound);

        this.password = hashPassword;
    } catch(e){
        next(e);
    }
});

userSchema.methods.generateToken = async function(){
    // the sign method creates the token
    try {
        return jwt.sign({_id: this._id},process.env.JWT_SECRET_KEY,{expiresIn:"30d"});
    } catch (error) {
        console.log(error);
    }
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

const User = mongoose.model('User',userSchema);
module.exports = User;