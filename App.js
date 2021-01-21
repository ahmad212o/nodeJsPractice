const fs=require('fs');
const http=require('http');
const express = require('express')
const app=express();
const FeedRoutes=require('./Routers/Feed')
const bodyParser=require('body-parser')
app.use(bodyParser.json());
app.use((req, res, next)=>{
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH');
res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
next();
});
app.use('/feed', FeedRoutes);
app.listen(3000);