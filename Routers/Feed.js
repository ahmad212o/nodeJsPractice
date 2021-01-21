const express=require('express');
const router = express.Router();
const {body}=require('express-validator');
const FeedController=require('../Controllers/Feed');
router.get('/posts',FeedController.getPost );
router.post('/create',FeedController.createPost );
router.post('post/:postId',FeedController.getAPost)
module.exports=router;