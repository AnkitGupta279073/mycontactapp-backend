const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type:String,
        required:[true,'please add user name']
    },
    email :{
        type:String,
        required:[true,'please add email address'],
        unique:[true,'email already exit']
    },
    password:{
        type:String,
        required:[true,'please add user password']
    }

},
{
    timestamps : true
});

const usersModel = mongoose.model('Users',userSchema);
module.exports = usersModel;