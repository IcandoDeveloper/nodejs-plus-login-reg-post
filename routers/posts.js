const express = require("express");
const Post = require("../schemas/posts");
const router = express.Router();
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/auth-middleware')
// 모든 게시글 데이터를 반환하는 함수
router.get("/posts", async (req, res) => {
    const post =await Post.find({});
    res.send({post})



    //     res.send({result: jsonData});
 
});


//댓글 생성
router.post("/comments/:num", authMiddleware,  async (req, res) => {
    let {comment} = req.body;
    let {user} = res.locals;
    let {num} = req.params
    console.log(user)
    
    // await Post.findOneAndUpdate({num : Number(num)},{$push:{comment:{comment:comment, nickname:user.nickname}}})
    //  $push : 추가하는업데이트 $pop :지우는거 $set 수정
    
    // res.json({comment})
 });
    
    //댓글 가져오기
    router.get('/:postsId/detail', async (req, res) => {
        const { postsId } = req.params;
        const existPosts = await Posts.find({ postsId: Number(postsId) });
        res.json(existPosts);
    });









//게시글 생성
router.post("/posts", async (req, res) => {
    let today = new Date()
    let date = today.toLocaleString()
    let num = 0
    const a = await Post.find()
    // console.log(a)
    if(a.length){
        num = a[a.length-1]['num'] + 1
    }else{
        num = 1
    }
    
     
        const {title, content, UserId, password} = req.body;
        console.log(title, content,password,UserId)

        await Post.create({UserId, password, title, content, date,num});
        res.send({result: "게시글을 생성하였습니다."});
      
    
});

//게시글 수정
router.put("/:_id", async (req, res) => {
    try {
        const _id = req.params._id;

        const user = req.body["user"];
        const password = req.body["password"];
        const title = req.body["title"];
        const content = req.body["content"];

        const isExist = await Post.findOne({_id, password});
        if (!isExist || !_id || !user || !password || !title || !content) {
            console.log(`${req.method} ${req.originalUrl} : 일치하지 않는 비밀번호 입니다.`);
            res.status(406).send();
            return;
        }
        await Post.updateOne({_id}, {$set: {user, title, content}});
        res.send({result: "게시글을 수정하였습니다."});
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        res.status(400).send();
    }
});

// 게시글 삭제
router.delete("/:_id", async (req, res) => {
    try {
        const _id = req.params._id;

        const password = req.body["password"];
        const isExist = await Post.findOne({_id, password});

        if (!isExist || !_id) {
            console.log(`${req.method} ${req.originalUrl} : 일치하지 않는 비밀번호 입니다.`);
            res.status(406).send();
            return;
        }

        await Post.deleteOne({_id});
        res.send({result: "게시글을 삭제하였습니다."});
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        res.status(400).send();
    }
});

module.exports = router;
