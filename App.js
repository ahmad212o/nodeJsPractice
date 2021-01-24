const fs=require('fs');
const http=require('http');
const path=require('path');
const express = require('express')
const multer=require('multer');
const app=express();

const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'assets/images')
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toString()+'_'+file.originalname);
    }

});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/png'||file.mimetype==='image/jpg'||file.mimetype==='image/jpeg'){
        cb(null,true)
    }else{
        cb(null,false);
    }
}

const mongoose = require('mongoose');
//OBnDOmoWp6JJhtot
const FeedRoutes=require('./Routers/Feed')
const bodyParser=require('body-parser')
app.use(multer({storage :fileStorage,fileFilter:fileFilter}).single('image'));
app.use(bodyParser.json());
app.use('/assets/images',express.static(path.join(__dirname,'assets/images')))
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
res.status(status).json({message:message});})
mongoose.connect('mongodb+srv://ahmad:OBnDOmoWp6JJhtot@cluster0.qxtb7.mongodb.net/ahmad?retryWrites=true&w=majority').then(result=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err);
})
