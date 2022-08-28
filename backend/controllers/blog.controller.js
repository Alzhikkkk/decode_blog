const { Blog, Sequelize, User } = require('../models');


const fs = require("fs");
const path = require("path");

const createBlog = async ({title, description, img, category_id, author_id}) => {  
    let imagePath;
    if(img) {
        imagePath = "/" + img
    }
    return new Promise(async resolve => {
        const blog = await Blog.create({
            title,
            description,
            img: imagePath,
            category_id,
            author_id,
        });
        resolve(blog)
    })
}


const deleteBlog = async id => {
    const Blogs = await Blog.findOne({where: {id}});
    try {
        fs.unlinkSync(path.join(__dirname, "../../frontend/public/images/blogs", Blogs.img))
    } catch (e) {
        console.log(e.message)
    } 

    return new Promise(async resolve => {
        await Blog.destroy({ where: { id } });
        resolve(true)
    })
}

const getDetailBlogs = async (req, res) => {
      const blogs = await Blog.findOne({
        include: ['authors', 'categories'],
        where: {id:req.params.id}
      });
      res.status(200).send(blogs);
}

const getProfileBlogs = async (req, res) => {
    console.log(req.params.nickname)
    const author = await User.findOne({where: {nickname: req.params.nickname}}); 
    if(!author) return res.status(404).send("Not Found");
    const Blogs = await Blog.findAll(
    {
        include: ['authors', 'categories'],
        where: {author_id: author.id}    
    });
    res.status(200).send(Blogs);
}


const getBlogs = async (req, res) => {
    const Blogs = await Blog.findAll({include: ['authors', 'categories']});
    res.status(200).send(Blogs);
}

const updateBlog = async ({id, title, description, img, category_id, author_id}) => {
    let imagePath;
    if(img) {
        const Blogs = await Blog.findOne({where :{id}});
        try {
            fs.unlinkSync(path.join(__dirname, "../../frontend/public/images/blogs", Blogs.img))
        } catch (e) {
            console.log(e.message)
        } 

        imagePath = "/" + img;

        return new Promise(async resolve => {
            const blogs = await Blog.update({ title, description, img:imagePath, category_id, author_id }, { where: { id } });
            resolve(blogs)
        })
        


    } else {
        return new Promise(async resolve => {
            const blogs = await Blog.update({ title, description,category_id, author_id }, { where: { id } });
            resolve(blogs)
        })
    }
}


module.exports = {
    createBlog,
    deleteBlog,
    getProfileBlogs,
    updateBlog,
    getBlogs,
    getDetailBlogs
}