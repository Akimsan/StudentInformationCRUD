const express = require("express");
const exphbs =  require("express-handlebars"); /*act as a template exphbs.engine*/
const bodyParser = require("body-parser"); /*handle json datas*/

// connect mysql
// const mysql = require("mysql");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Static files
app.use(express.static("public"));


//Template Engine
const handlebars = exphbs.create({extname:".hbs"});
app.engine('hbs',handlebars.engine);
app.set("view engine","hbs");

// MySql connection
// const con = mysql.createPool({
//     connectionLimit:10,
//     host          :  process.env.DB_HOST,
//     user          :  process.env.DB_USER,
//     password      :  process.env.DB_PASS,
//     database      :  process.env.DB_NAME,
// });

//Check database connection 
// con.getConnection((err,connection)=>{
//    if(err) {
//       console.log("Error "+ err)
//    }
//    else{
//       console.log("Connection Successfull:");
//     }
    
// });

/*
//Router
app.get('/',(req,res)=>{
   res.render("home");
});
*/
const routes = require("./server/routes/students");
app.use('/',routes);


//listen port
app.listen(port,()=>{
    console.log("listening port : "+port);
    
});
////////////////////////////////////////////////////////////////////////////////////








