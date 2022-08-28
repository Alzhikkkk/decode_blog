const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require('../config/config')
const {getUserById} = require('../controllers/auth.controller')

const isAuth = (req, res, next) => {
    if(req.headers.authorization){
        let token = req.headers.authorization.split(" ");
        token = token[1];
        jwt.verify(token, SECRET_KEY, async (err, decoded) => {
            if(err) res.status(401).end();
                
            const user = await getUserById(decoded.id)
            req.user = user;
            next();
        })
    }else{
        res.status(401).end();
    }
     
     
}


function registrationValidator(req, res, next) {
    let {
        full_name,
        email,
        nickname,
        password,
        password2
    } = req.body;
    if(!full_name || full_name.length < 2) return res.redirect("/register?error=1")
    if(!email || email.length < 2) return res.redirect("/register?error=2")
    if(!nickname || nickname.length < 2) return res.redirect("/register?error=3")
    if(!password || password.length < 3) return res.redirect("/register?error=4")
    if(password != password2) return res.redirect("/register?error=5")

    next();
}


module.exports = {
    isAuth,
    registrationValidator
}