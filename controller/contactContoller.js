const asynchandler = require('express-async-handler');
const contactModel = require('../models/contacttModel');
const {constants} = require('../constants');
//@desc get all contact
//@route GET /api/contact
//@access private
const getContact = asynchandler(async (req,res)=>{
    const getContactData = await contactModel.find({'user_id':req.user.id});
    res.status(200).json(getContactData);
});

//@desc get all contact by id
//@route GET /api/contact/:id
//@access private
const getContactById = asynchandler(async (req,res)=>{
    const contact = await contactModel.findById(req.params.id);
    
    if(!contact){
        res.status(constants.NOT_FOUND);
        throw new Error('Contact not found');
    }
    res.status(200).json(contact);
});

//@desc create new contact
//@route POST /api/contact
//@access private
const createContact = asynchandler(async (req,res)=>{
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(constants.VALIDATION_ERROR);    
        throw new Error('All fields are required');
    }
   
    const loginUserId = req.user.id;
     // Create a new object with loginUserId and properties from req.body
     const contactDataWithUserId = {
        ...req.body,
        user_id: loginUserId
    };

    const contact = new contactModel(contactDataWithUserId);
    const saveContact = await contact.save();    
    res.status(201).json(saveContact);
});

//@desc delete contact
//@route delete /api/contact/:id
//@access private
const deleteContact = asynchandler(async (req,res)=>{

    const contact = await contactModel.findById(req.params.id);
   
    if(!contact){
        res.status(constants.NOT_FOUND);
        throw new Error('Contact not found');
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(constants.FORBIDDAN);
        throw new Error('user does not have permission to update other user contacts');
    }
    await contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
});

//@desc update contact
//@route POST /api/contact/:id
//@access private
const updateContact = asynchandler(async (req,res)=>{
    const contact = await contactModel.findById(req.params.id);
    
    if(!contact){
        res.status(constants.NOT_FOUND);
        throw new Error('Contact not found');
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(constants.FORBIDDAN);
        throw new Error('user does not have permission to update other user contacts');
    }
    const updateContact = await contactModel.findByIdAndUpdate(req.params.id,req.body,{new : true});
    res.status(200).json(updateContact);
});
module.exports = {getContact,getContactById,createContact,deleteContact,updateContact};