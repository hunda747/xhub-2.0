const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');

const bodyParser = require('body-parser');


const app = express();

app.set('view engine' , 'hbs'); // handle bars for rendering html templates



app.use(bodyParser.urlencoded({ extended: false }));
const publicDirectory = path.join(__dirname , './public'); // gives us access to current directory


// app.use(express.static(publicDirectory)); // allow the server to use the public direcory which is the css files we have
// app.use(express.json()); // ensure the value grabed from HTML forms is in json format


app.use('/', require('./routes/pages'));
// define an auth path for the submitted posts
app.use('/auth' , require('./routes/auth'));


// define our route to get access to our pages

app.use(express.urlencoded({ extended: false})); // ensures we can grab the data send from any HTML form
app.listen(4000, ()=>{
    console.log("Server has started on port 4000");
});