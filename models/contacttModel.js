const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id:{
            type:mongoose.Schema.Types.ObjectId,
            require:true,
            ref:"User"
    },
    name:{
        type:String,
        require:[true,"Please add the contact name"]
    },
    email:{
        type:String,
        require:[true,"Please add the contact email"]
    },
    phone:{
        type:String,
        require:[true,"Please add the contact phone"]
    }
},{
    timestamps : true
});

const contactModel = mongoose.model('Contact',contactSchema);
module.exports = contactModel;