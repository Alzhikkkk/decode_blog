const {Comment} = require('../models');

const getComments = async (req, res) => {
    const comments = await Comment.findAll({include: ['blogs', 'users'], where:{blog: req.params.blog_id}});
    res.status(200).send(comments);
}

const createComment = async ({text, blog_id, user_id}) => {
    console.log(user_id);
    return new Promise(async resolve => {
        const comment = await Comment.create({
            text: text,
            blog: blog_id,
            user: user_id
        });
        resolve(comment)
    })
}

const deleteComment = async (req, res) => {
    return new Promise(async resolve => {
        await Comment.destroy({ where: { id:req.params.id } });
        resolve(true)
    })
}

module.exports = {
    getComments,
    createComment,
    deleteComment
}