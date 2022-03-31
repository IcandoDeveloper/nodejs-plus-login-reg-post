const mongoose = require("mongoose");

const { Schema } = mongoose;


const commentSchema = new Schema({
    comment: {
        type: String,
    },
    nickname : {
        type: String,
    },

    number: {
        type: String,
    },
    

});


const postsSchema = new Schema({
    
    num: {
        type: Number
    },
    UserId: {
        type: String,
    },
    title: {
        type: String,
        
    },
    content: {
        type: String,
        
    },
    password: {
        type: String,
        
    },
    date: {
        type: String,
    },
    comment: [commentSchema],
    createdAt: {
        type : Date,
       
  },

});


module.exports = mongoose.model("Comment", commentSchema);
module.exports = mongoose.model("Posts", postsSchema);