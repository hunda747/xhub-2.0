const req = require("express/lib/request");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt =  require("jsonwebtoken");
const dotenv = require('dotenv');
const fs = require("fs");
const { eventNames } = require("process");

const db = require('../util/database');
const Admin = require('../models/admin');
const New_register = require('../models/new_register');

dotenv.config({path:'../.env'});

exports.getNewRegister = async (req, res,next) => {
	try{
		const [result, metaData] = await New_register.fetchAll();
		console.log(result);
		res.render('tableview', {requests: result, name: 'try'});
	}catch(error){
		console.log('fetch error: ' + error);
	}
}
exports.getNewRegisterDetail = async (req, res,next) => {
	console.log('in');
	const email = req.params.email;
	console.log('emaillllllllllll: ' + email);
	try{
		const [result, metaData] = await New_register.checkEmail(email);
		console.log(result);
		res.render('tableviewDetail', {request: result, name: 'try'});
	}catch(error){
		console.log('fetch error: ' + error);
	}
}

exports.getAdminLogin = async(req, res ,next) => {
 	try{
		const {email , password} = req.body;
    console.log(email);
    console.log(password);

		const results =await Admin.findByEmail(email);
			try{
				console.log(results);
				console.log(results[0]);

				if(results.length == 0){
					res.render('adminLogin', {message: "Accound does not exist"});
			 	}
			 	else if(! password === results[0].password){
					 res.render('adminLogin' , {message: 'Invalid password'});
			 	}else{
					 res.render('dashboard' , {user: email});                    
			 	}
			}catch(error){
				console.log('small' + error);
			}
 	}catch(err){
  	console.log('big' + err);
 	}
}

exports.addNew_register = (res, req, next) => {
	try{
		const {enterpreneur_fullName,email,phone_number,business_name,business_address,business_partener,description,business_description,business_solution,business_support,business_stage} = req.body;
	
		const new_register = new New_register(enterpreneur_fullName,email,phone_number,business_name,business_address,business_partener,description,business_description,business_solution,business_support,business_stage);
	
		const results = New_register.checkEmail(email);
		if(error){
			console.log(error);
		}
		else if(results.length >0){
			return res.render('register',{email_message: 'Email already in use'});
		}
		else if(!/.{3,}$/.test(enterpreneur_fullName)){
								 return res.render('register' , {Enterp_fullName_message: 'Enterpreneur Name is Invalid'});
		}
		else if(!/((^(\+251|0)\d{3})-?\d{6})/im.test(phone_number)){
				return res.render('register', {phone_number_message: 'Invalid phone number'});
		}
		else if(!/.{2,}$/.test(business_name)){
			 return res.render('register', {business_name_message: 'Business Name invalid'});
		}
		else if(!description.length > 10){
			 return res.render('register', {description_message: 'Description too short, please enter more information'})
		}
		else if(!business_description.length > 10){
			 return res.render('register', {business_description_message: 'Business Description too short, please enter more information'});
		}
		else if(!business_solution.length > 10){
				return res.render('register', {business_solution_message: 'Business solution Description is too short, please enter more information'});
		}
		else if(!business_support.length > 10){
				return res.render('regiter', {business_support_message: 'Business support Description is too short, please enter more information'});
		}
		else{
			 res.render('index');
		}
	
		new_register.save();
	}catch(error){
		console.log('big a:  '+error);
	}

}