require('dotenv').config();
const express = require("express");
const bodyParser= require("body-parser");
const ejs= require("ejs");
const mongoose =require("mongoose");
const encrypt=require("mongoose-encryption");


const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

//Connect to mongoDB and create a database 
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});


//Create a schema or table format 
const userSchema = new mongoose.Schema ({
    email: String,
    password: String,
    // googleId: String,
    // secret: String
  });

//Level2:-Password Encrytption
//level 3: Environment variables

userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields:["password"]});

//Model the schema 
const User = new mongoose.model("User", userSchema);




app.get("/",function(req,res){
    res.render("home");
})

app.get("/login",function(req,res){
    res.render("login");
})

app.get("/register",function(req,res){
    res.render("register");
})


app.post("/register",function(req,res){

 //Make a new user in the database when regiser button gets hit
 const newUser= new User({
    email:req.body.username,
    password:req.body.password
 });

 newUser.save(function(err){
    if(!err){
        res.render("secrets");

    }
    else{
        console.log(err);

    }
 })

});

app.post("/login",function(req,res){
    User.findOne({email:req.body.username},function(err,foundUser){
        if(err){
          console.log(err);
        }
        else{
            if(foundUser){
                if(foundUser.password===req.body.password){
                    res.render("secrets");
                }
            }
            else{
                console.log("Cant find the email");
            }
        }
    });

});








app.listen(3000,function(){
    console.log("Server is successfully running at port 3000");

})

