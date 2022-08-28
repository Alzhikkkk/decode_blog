const express = require("express");
const router = express.Router();
const {upload} = require('../utils/multer');

const {isAuth} = require('../middleware/auth.middleware')
const {createBlog, deleteBlog, getProfileBlogs, updateBlog, getBlogs, getDetailBlogs} = require('../controllers/blog.controller');

router.post("/api/blogs", upload.single('img'), async(req , res) => {
    try{
        const blog = await createBlog({
            title:req.body.title,
            description:req.body.description,
            img:req.file.filename,
            category_id:req.body.category_id,
            author_id: req.body.author_id
        })
        res.status(200).send(blog)
    }catch(error){
        res.status(400).send(error)
    }
});

router.delete('/api/blogs/:id',async(req , res) => {
    try{
        await deleteBlog(req.params.id)
        res.status(200).end()
    }catch(error){
        res.status(400).send(error)
    }
})

router.get("/api/blogs", getBlogs);

router.get('/api/blogs/detail/:id', getDetailBlogs);


router.get("/api/blogs/profile/:nickname", getProfileBlogs)

router.put('/api/blogs/:id', upload.single('img'), async(req , res) => {
    try{
        console.log(req.file)
        const blogs = await updateBlog({
            id:req.body.id,
            title:req.body.title,
            description:req.body.description,
            img:req.file.filename,
            category_id:req.body.category_id,
            author_id: req.body.author_id
        })
        res.status(200).send(blogs)
    }catch(error){
        res.status(400).send(error)
    }
})


module.exports = router;