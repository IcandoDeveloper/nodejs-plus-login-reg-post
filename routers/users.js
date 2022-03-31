const express = require('express')
const User = require("../schemas/user") // models 폴더의  user 파일을 참조하겠다는내용
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/auth-middleware')

const router = express.Router() // 경로를 지정하겠다는 뜻





router.post("/users", async(req, res)=> {
    const { nickname, password, confirmPassword } = req.body
    const is_nickname = /^[a-zA-Z0-9]{3,10}$/
    if (!is_nickname.test(nickname)){
        
        res.status(400).send({
            errorMessage: "닉네임은 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 구성",
        });
        return;
    };

    if (password !== confirmPassword) {
        res.status(400).send({
            errorMessage: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
        })
        return; //return 을 하지않으면 만약 패스워드가 다르더라도 실행이되어버린다.
    } else if (password.length<4) {
        res.status(400).send({
            errorMessage: " 패스워드는 4글자 이상 적어주세요.",
        });
        return; 
    };
    
    const existUsers = await User.find({ //닉네임이나 이메일이 데이터베이스에 겹치는게 있는지 확인하느코드
        $or: [ {nickname}],
    })
    if (existUsers.length) { // 닉네임이나 이메일이 데이터베이스에 겹치는 데이터있으면 발생할 이메일
        res.status(400).send({
            errorMessage: '이미 가입된 닉네임이 있습니다.',
        })
        return;
    }else if (nickname ===password) {
        res.status(400).send({
            errorMessage: "닉네임과 패스워드를 다르게 해주세요",
        });
        return; 
    };
    const user = new User({  nickname, password })
    await user.save()
    res.status(201).send({})
})
router.post("/auth", async(req,res)=> {
    const {nickname} = req.body //body로 이메일과 패스워드값을 넘겨주겠다.
    const user = await User.findOne({nickname:nickname})
    if (!user) {
        res.status(400).send({
            errorMessage: "닉네임 또는 패스워드가 잘못되었습니다.",
        })
        return
    }
    const token = jwt.sign({ userId: user.userId }, "my-secret-key")
    res.send({
        token,
    })
})
router.get("/users/me",authMiddleware, async (req, res)=> {
    const { user } = res.locals;
    res.send({
        user,
    })
})

module.exports = router;