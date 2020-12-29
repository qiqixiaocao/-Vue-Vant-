const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
mongoose.connect("mongodb://localhost:27017/20201211", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const Schema = mongoose.Schema;
const userSchema = new Schema({
    userName: String, //用户名
    userPassword: String, //用户密码
    userMessage: String, //用户简介
    userImg: String, //用户图片
    userScore: Number, //用户评分
});
const User = mongoose.model("User", userSchema, "user");
module.exports = User;