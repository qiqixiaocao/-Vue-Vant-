// 给user集合中插入数据
const User = require("./User");

const user = new User({
    userName: "李白",
    userMessage: "今朝有酒今朝醉",
    userScore: "4",
    userImg: "16069120909790.jpg",
    userPassword: "123456"
});

user.save().then((res) => {
    console.log(res);
});