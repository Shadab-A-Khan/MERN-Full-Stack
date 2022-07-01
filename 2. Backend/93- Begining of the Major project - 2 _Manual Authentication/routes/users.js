const express = require('express');
const router=express.Router();

const usersController=require('../controllers/users_controller');

router.get('/usersProfile' ,usersController.usersProfile);
router.get('/sign_up' ,usersController.userSignUp);
router.get('/sign_in' ,usersController.userSignIn);

//creating a user's account
router.post('/create' , usersController.create);
router.post('/create-session',usersController.createSession);

module.exports=router;