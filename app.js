const express = require('express')
const mongoose = require('mongoose')
const Posts = require('./schemas/posts')
mongoose.connect("mongodb+srv://test:sparta@cluster0.qjqnl.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const db = mongoose.connection // db를 연결하겠다는뜻
db.on("error", console.error.bind(console, "connection error:")) // 연결오류가 나면 에러나 났다고 알려주는 코드
const app = express() // express웹서버를 사용하겠다는 뜻


app.use(express.json());

const postsRouter = require("./routers/posts");
app.use("/api", [postsRouter]);


 const router = express.Router() // 경로를 지정하겠다는 뜻
 app.use("/api", express.urlencoded({extended: false}), router)

 const UserRouter = require('./routers/users');
 app.use("/api", UserRouter);

 
//  app.get('/posts', (req, res) => {
//     res.sendFile(__dirname + '/static/main.html')
//   });
 app.get('/board', (req, res) => {
    res.sendFile(__dirname + '/assets/comment.html')
  });


app.use(express.static("assets"))
app.listen(3000, () => {
    console.log("서버가 요청을 받을 준비가 되었어요!")
})