require('dotenv').config();
const express = require("express");
const bodyParser= require("body-parser");
const ejs= require("ejs");
const mongoose =require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));




app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
  }));

app.use(passport.initialize());
app.use(passport.session());


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

  userSchema.plugin(passportLocalMongoose);



//Model the schema 
const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




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

});

app.post("/login",function(req,res){

});








app.listen(3000,function(){
    console.log("Server is successfully running at port 3000");

})

