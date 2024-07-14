const { registerUser, loginUser, activeUser, getAllUsers, updateProfile, findAccount, resetPassword, makeAdmin, removeSingleUser } = require('../Controller/authController');
const authGround = require('../Middleware/authGroud');


const authRoute = require('express').Router();

//Register User
authRoute.post('/register', registerUser);

//Login User
authRoute.post('/login', loginUser);

//get all User
authRoute.get('/allUsers', getAllUsers);

//active User
authRoute.get('/loginUser', authGround, activeUser);

//find User
authRoute.post('/findAccount', findAccount);

//Delete Single User
authRoute.delete('/removeSingleUser/:id', removeSingleUser);

//Reset Password
authRoute.put('/resetPassword/:userId', resetPassword);

//Make Admin
authRoute.put('/makeAdmin/:id', authGround, makeAdmin);

//update profile
authRoute.put('/updateProfile/:id', updateProfile);

module.exports = authRoute;