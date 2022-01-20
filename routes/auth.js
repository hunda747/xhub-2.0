const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const adminController = require('../controllers/admin');

//this are different routes in our website 
// router helps in rendering the pages when given a path by name

router.post("/register" , authController.register);
router.post("/adminLogin" , adminController.getAdminLogin);
 


module.exports = router;

