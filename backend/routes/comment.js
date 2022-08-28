const express = require("express");
const router = express.Router();
const {getComments, createComment, deleteComment} = require('../controllers/comment.controller');

router.get('/api/comments/:blog_id', getComments)
router.post('/api/comments', async (req, res) => {
    try{
        console.log(typeof parseInt(req.body.user_id))
        const comment = await createComment({
            text: req.body.text,
            blog_id: req.body.blog_id,
            user_id:req.body.user_id
        })
        res.status(200).send(comment)
    }catch(error){
        res.status(400).send(error)
    }
})
router.delete('/api/comments/:id', deleteComment)


module.exports = router;