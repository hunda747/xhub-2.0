const req = require("express/lib/request");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt =  require("jsonwebtoken");
const dotenv = require('dotenv');
const fs = require("fs");
const { eventNames } = require("process");
const db = require('../util/database')
const New_register = require('../models/new_register')

dotenv.config({path:'../.env'});

//login handler
exports.adminLogin = (req, res)=>{
    try{
        const db = mysql.createConnection({
            host: process.env.DATABASE_HOST, // if we have a server we put the ip of the server which we are running on
            user: process.env.DATABASE_USER ,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE
        });

        const {email , password} = req.body;

        console.log(email);
        console.log(password);

        // check if the form contains the admin and login else move on 
        db.query("SELECT * FROM admin WHERE email=?", [email] , async(error, results)=>{
            try{
                console.log(results);
                console.log(results[0].role);

                if(results.length == 0){
                   res.render('adminLogin', {message: "Accound does not exist"});
                }
                else if(!await bcrypt.compare(password , results[0].password)){
                    res.render('adminLogin' , {message: 'Invalid password'});
                }else{
                    res.render('dashboard' , {user: email});                    
                }
            }catch(error){
                console.log(error);
            };
        });
    }catch(error){
        console.log(error);
    }

}
//registration handler
exports.register = async (req, res)=>{

    // const db = mysql.createConnection({
    //     host: process.env.DATABASE_HOST, // if we have a server we put the ip of the server which we are running on
    //     user: process.env.DATABASE_USER ,
    //     password: process.env.DATABASE_PASSWORD,
    //     database: process.env.DATABASE
    // });

    const {enterpreneur_fullName,email,phone_number,business_name,business_address,business_partener,description,business_description,business_solution,business_support,business_stage} = req.body;
    
    console.log(req.body);
    console.log(business_support.length);

    try{
		// const {enterpreneur_fullName,email,phone_number,business_name,business_address,business_partener,description,business_description,business_solution,business_support,business_stage} = req.body;
	
		const new_register = new New_register(enterpreneur_fullName,email,phone_number,business_name,business_address,business_partener,description,business_description,business_solution,business_support,business_stage);
        console.log(new_register.business_partener);

        // can loop through business parteners name with this loop
            for(var i=0; i<req.body.business_partener.length; i++){
                console.log(req.body.business_partener[i]);
            }
        console.log();
		const [results, field_Data] = await New_register.checkEmail(email);
        console.log(results);
		try{
            // if(false){
            //     console.log(false);
            // }
            // else if(results.length >0){
            //     return res.render('register',{email_message: 'Email already in use'});
            // }
            // else if(!/.{3,}$/.test(enterpreneur_fullName)){
            //                          return res.render('register' , {Enterp_fullName_message: 'Enterpreneur Name is Invalid'});
            // }
            // else if(!/((^(\+251|0)\d{3})-?\d{6})/im.test(phone_number)){
            //         return res.render('register', {phone_number_message: 'Invalid phone number'});
            // }
            // else if(!/.{2,}$/.test(business_name)){
            //      return res.render('register', {business_name_message: 'Business Name invalid'});
            
            // }
            // else if(!description.length > 10){
            //      return res.render('register', {description_message: 'Description too short, please enter more information'})
            // }
            // else if(!business_description.length > 10){
            //      return res.render('register', {business_description_message: 'Business Description too short, please enter more information'});
            // }
            // else if(!business_solution.length > 10){
            //         return res.render('register', {business_solution_message: 'Business solution Description is too short, please enter more information'});
            // }
            // else if(!business_support.length > 10){
            //         return res.render('regiter', {business_support_message: 'Business support Description is too short, please enter more information'});
            // }
            // else{
            //      res.render('index');
            // }
        }catch(err){
            console.log('check error:   '+err);
        }
        console.log('check over');
        try{
            await new_register.save();
        }catch(e){
            console.log('Insert error :   '+e);
        }
	}catch(error){
		console.log('big a:  '+error);
	}



    // db.query("SELECT email FROM  new_registers WHERE email=?", [email], async(error, results)=>{
    //     if(error){
    //         console.log(error);
    //     }
    //     else if(results.length >0){
    //         return res.render('register',{email_message: 'Email already in use'});
    //     }
    //     else if(!/.{3,}$/.test(enterpreneur_fullName)){
    //                  return res.render('register' , {Enterp_fullName_message: 'Enterpreneur Name is Invalid'});
    //     }
    //    else if(!/((^(\+251|0)\d{3})-?\d{6})/im.test(phone_number)){
    //         return res.render('register', {phone_number_message: 'Invalid phone number'});
    //    }
    //    else if(!/.{2,}$/.test(business_name)){
    //        return res.render('register', {business_name_message: 'Business Name invalid'});
    //    }
    //    else if(!description.length > 10){
    //        return res.render('register', {description_message: 'Description too short, please enter more information'})
    //    }
    //    else if(!business_description.length > 10){
    //        return res.render('register', {business_description_message: 'Business Description too short, please enter more information'});
    //    }
    //    else if(!business_solution.length > 10){
    //         return res.render('register', {business_solution_message: 'Business solution Description is too short, please enter more information'});
    //    }
    //    else if(!business_support.length > 10){
    //         return res.render('regiter', {business_support_message: 'Business support Description is too short, please enter more information'});
    //    }
    //    else{
    //        res.render('index');
    //    }

    //    db.query('INSERT INTO new_registers SET?' , {enterpreneur_name:enterpreneur_fullName,
    //     email:email,
    //     phone_number:phone_number,
    //     business_name:business_name,
    //     business_address:business_address,business_partener1:business_partener[0],business_partener2:business_partener[1], business_partener3:business_partener[2],
    //     description:description,business_description:business_description,business_solution:business_solution,business_support:business_support,business_stage:business_stage}, (err,results)=>{
    //         if(err){
    //             console.log(err);
    //         }
    //         else{
    //             console.log("recorded");            
    //         }      
    //     });
       
    // });

};


exports.display_new_registers = (req,res)=>{
    const db = mysql.createConnection({
        host: process.env.DATABASE_HOST, // if we have a server we put the ip of the server which we are running on
        user: process.env.DATABASE_USER ,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE
    });
    
    db.query("SELECT * FROM new_registers" , (error, results)=>{ 
        //    var dataArray = [];
        //     const obj ={
        //         dataArray:[]
        //     }
         
        var allData = [];
        
         // loop through the results of db to store in array to push to json file
        for(var i=0;i<results.length; i++){
            var {id,enterpreneur_name,email,phone_number,business_name,business_address,business_partener1,business_partener2,business_partener3,description,business_description,business_solution,business_support,business_stage} = results[i];
            var items = {id,enterpreneur_name,email,phone_number,business_name,business_address,business_partener1,business_partener2,business_partener3,description,business_description,business_solution,business_support,business_stage};
              
            allData.push(items);
            // obj.dataArray.push(items);           
        }
        console.log(allData); 
        console.log(allData.length);    

        var nameArray = [];
        var emailArray = [];
        var phoneArray = [];
        var businessArray = [];
        for(var i=0;i<allData.length; i++){           
            nameArray[i] = allData[i].enterpreneur_name;
            emailArray[i] = allData[i].email;
            phoneArray[i] = allData[i].phone_number;
            businessArray[i] = allData[i].business_name;
        }
    //    var json = JSON.stringify(dataArray);

    // // creating a json file to store the database data for the table view
    //   fs.writeFile("table.json" , json, 'utf-8' , (err)=>{ if(err)throw err});

    //   res.send(items)
    //   res.render("tableview");
    });  
}











