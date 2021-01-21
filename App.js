const fs=require('fs');
const http=require('http');
const path=require('path');
const express = require('express')
const app=express();
const mongoose = require('mongoose');
//OBnDOmoWp6JJhtot
const FeedRoutes=require('./Routers/Feed')
const bodyParser=require('body-parser')
app.use(bodyParser.json());
app.use('/assets/images',express.static(path.join(__dirname)))
app.use((req, res, next)=>{
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH');
res.setHeader('Access-Control-Allow-Headers','Content-Type');
next();
});
app.use('/feed', FeedRoutes);
app.use((error,req,res,next)=>{
console.log(error);
const status=error.statusCode || 500;
const message=error.message;
res.status(status).json({message:message});

})
mongoose.connect('mongodb+srv://ahmad:OBnDOmoWp6JJhtot@cluster0.qxtb7.mongodb.net/ahmad?retryWrites=true&w=majority').then(result=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err);
})
