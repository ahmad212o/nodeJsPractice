const {validationResult}=require("express-validator")
const Post=require("../models/post")
exports.getPost=(req,res,next)=>{
    Post.find().then(posts=>{
        res.status(200).json({message:'posts fetched',posts:posts})
    }).catch(err=>{
        if(! err.statusCode){
            err.statusCode=500
        }
        next(err);
    })
};
exports.createPost=(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty)
    {
        const error=new Error('Validation Error')
        error.statusCode = 422
        throw error;
    }
const title = req.body.title;
const content=req.body.content;
const url=req.body.imageUrl;
const post=new Post({
            title:title,
            imageUrl:'../assets/images/ahmad.jpg',
            content:content,
            creator :{name:'ahmad'},

})
post.save()
.then(result=>{
console.log(result)
res.status(201).json({
    message:'the post has been created',
    post:result
})        
})
.catch(err=>{
    if(! err.statusCode){
        err.statusCode=500
    }
    next(err);
})

}
exports.getAPost=(req,res,next)=>{
    const postId=req.params.postId;
    Post.findById(postId)
    .then(post=>{
        if(!post){
            const error=new Error('could not find post')
            error.statusCode=404;
            throw error;
        }
        res.status(200).json({message:'post found',post:post})
    })
    .catch(err=>{
        if(! err.statusCode){
            err.statusCode=500
        }
        next(err);
    })
}