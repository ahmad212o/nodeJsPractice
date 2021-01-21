const express=require('express');
const router = express.Router();
const FeedController=require('../Controllers/Feed')
router.get('/posts',FeedController.getPost );
router.post('/create',FeedController.createPost );




module.exports=router;