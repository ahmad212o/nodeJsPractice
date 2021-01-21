
exports.getPost=(req,res,next)=>{
res.status(201).json(
    {
        Posts:    [{title:'ahmad',content:'this is my first post'}]
    }
);
};
exports.createPost=(req,res,next)=>{
const title = req.body.title;
const content=req.body.content;
console.log(title,content)
res.status(201).json(
    {
        message:'the post has been created',
        post:{
            _id:new Date(),
            tite:title,
            content:content
            

        }

    }
)


};