const jwt = require("jsonwebtoken")
const User = require("../schemas/user")
module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(' ');
    console.log(tokenType, tokenValue)
    if (tokenType !== 'Bearer') {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요',
        })
        return;
    }
    try {
        const { userId } = jwt.verify(tokenValue, "my-secret-key")
         console.log(userId)
        
        User.findById(userId).then((user) => {
            res.locals.user = user;
            // console.log(a)
            next()
        })
    }   catch (error) {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요',
        })
        return;
    }
}