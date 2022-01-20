const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const adminController = require('../controllers/admin')

//this are different routes in our website 
// router helps in rendering the pages when given a path by name

router.get("/" , (req,res)=>{
    res.render("index");
});
router.get("/adminLogin" , (req,res)=>{
    res.render("adminLogin");
});
router.get("/register" , (req,res)=>{
    res.render("register");
});
router.get("/dashboard" , (req,res)=>{
    res.render("dashboard");
});
router.get("/profile" , (req,res)=>{
    res.render("profile");
});

router.get("/about", (req,res)=>{
    res.render("about");
});
router.get("/services", (req,res)=>{
    res.render("services");
}); 
router.get("/connect" , (req,res)=>{
    res.render("connect");
});

router.get("/tableview" ,adminController.getNewRegister);
router.get("/tableview/:email", adminController.getNewRegisterDetail);
// router.get("/tableview", (req,res)=>{
//     res.render("tableview")
// })

router.post("/tableviewDetail/reject", adminController.changeStatusRejected);
router.post("/tableviewDetail/interview", adminController.changeStatusInterview);

module.exports = router;