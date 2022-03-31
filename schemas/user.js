const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    nickname: String,
    password: String,
})
UserSchema.virtual("userld").get(function() {
    return this._id.toHexString()
})
UserSchema.set("toJSON", {
    virtuals:true,
})
module.exports = mongoose.model("User", UserSchema)



