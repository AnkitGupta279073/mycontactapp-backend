const asynchandler = require('express-async-handler');
const usersModel = require('../models/usersModel');
const bcrypt = require('bcrypt');
const { constants } = require('../constants');
const jwt = require('jsonwebtoken');
//@desc register user
//@route GET /api/users/register
//@access public
const userRegister = asynchandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error('All fields are manadory');
    }

    const userAlreadyExist = await usersModel.findOne({ email });
    if (userAlreadyExist) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await usersModel.create({ username, email, password: hashedPassword });
    if (createUser) {
        res.status(201).json({ _id: createUser.id, email: createUser.email });
        console.log(createUser);
    } else {
        res.status(constants.VALIDATION_ERROR);
        throw new Error('User not created successfully.');
    }
    res.status(200).json({ message: 'register user' });
});

//@desc login user
//@route GET /api/users/login
//@access public
const loginRegister = asynchandler(async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        res.status(constants.VALIDATION_ERROR);
        throw new Error('All field are required');
    }

    const user = await usersModel.findOne({ email });
    if (user && (await bcrypt.compare(password
        , user.password))) {
        const accessToken = jwt.sign({ users: { username: user.username, email: user.email, id: user.id } }, process.env.ACCESS_TOKEN_SECERT, { expiresIn: '15m' });

        res.status(200).json({ accessToken: accessToken });
    }else{
        res.status(constants.NOT_FOUND);
        throw new Error('Invalid uesername and password');
    }

  
    
});

//@desc current user
//@route GET /api/users/current
//@access private
const currentRegister = asynchandler(async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = { userRegister, loginRegister, currentRegister }