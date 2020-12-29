const express = require("express"); //引入express
const app = new express(); //创建实例
const fs = require("fs"); //引入fs
var multer = require("multer"); //multer用于处理文件上传的nodejs中间件,
const cors = require("cors"); //（解决跨域问题）CORS是一个W3C标准，全称是"跨域资源共享"
const User = require("./model/User"); //引入user.js
var bodyParser = require("body-parser"); //第三方中间价

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

var upload = multer({
  storage: storage,
});
app.use(cors());
// app.set('view engine', 'ejs')//ejs模板引擎
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
); //处理form表单数据urlencoded
app.use(bodyParser.json()); //处理json数据
app.use("/uploads", express.static("uploads")); //配置虚拟路径可以用于访问
app.use(express.static("public")); //静态托管

//搭配路由
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.get("/detail", (req, res) => {
  res.render("detail");
});

//上传图片
app.post("/upload", upload.single("avatar"), function(req, res, next) {
  if (req.file) {
    res.json({
      code: 200,
      path: req.file.path,
    });
  }
});

//删除指定的图片
app.delete("/userDelImg/:id", async (req, res) => {
  const id = req.params.id;
  const result1 = await User.findById(id);
  let b = result1.userImg.substring(22);
  fs.unlink(b, function(err) {
    if (err) {
      return console.error(err);
    } else {
      console.log("删除指定图片成功");
    }
  });
});

//删除指定数据
app.delete("/userDel/:id", async (req, res) => {
  const id = req.params.id;
  const result1 = await User.findById(id);
  let b = result1.userImg.substring(22);
  fs.unlink(b, function(err) {
    if (err) {
      return console.error(err);
    } else {
      console.log("删除指定数据成功");
    }
  });
  const arr = await User.findByIdAndDelete(id);
  res.json({
    code: 200,
    msg: "删除成功",
  });
});

//登录
app.get("/login", async (req, res) => {
  const username = req.query.userName;
  const password = req.query.userPassword;
  // console.log(username, password);
  const result = await User.find(); //查询数据库获取用户列表数据
  // console.log(result);
  for (let i = 0; i < result.length; i++) {
    if (result[i].userName == username) {
      if (result[i].userPassword == password) {
        res.json({
          code: 200,
          msg: "获取用户列表成功",
          user: result[i],
        });
      } else {
        res.json({
          code: 202,
          msg: "获取用户列表失败",
        });
      }
    } else {
      res.json({
        code: 202,
        msg: "获取用户列表失败",
      });
    }
  }
  // for (index in result) {
  //     if (result[index].userName == username) {
  //         if (result[index].userPassword == password) {
  //             res.json({
  //                 code: 200,
  //                 msg: "获取用户列表成功",
  //                 user: result[index],
  //             });
  //         } else {
  //             res.json({
  //                 code: 202,
  //                 msg: "获取用户列表失败",
  //             });
  //         }
  //     }
  // }
});

// 登录接口
app.post("/user/login", function(req, res) {
  // req.session.token='加密算法生成随机token'
  // const data={"code":20000,"data":{"roles":["editor"],"token":req.session.token,"introduction":"I am a super administrator","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Super Admin"}}
  const data = {
    code: 20000,
    data: {
      token: "asasasasas",
      orangiseid: "wwwwwwww",
      introduction: "I am a super administrator",
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      name: "Super111 Admin",
    },
  };
  res.json(data);
});

// 拉取用户信息
app.get("/user/info", function(req, res) {
  const data = {
    code: 20000,
    data: {
      roles: ["admin"],
      introduction: "I am a super administrator",
      avatar:
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      name: "Super111 Admin",
    },
  };
  res.json(data);
});

//注销接口
app.post("/user/logout", function(req, res) {
  res.json({
    code: 20000,
    message: "success",
  });
});

//更新接口
app.put("/userUpdate/:id", async (req, res) => {
  //console.log(req.body.userName, req.body.carname, req.body.age);
  const result = await User.findByIdAndUpdate(req.params.id, {
    userName: req.body.userName, //用户名
    userPassword: req.body.userPassword, //用户密码
    userMessage: req.body.userMessage, //用户简介
    userScore: req.body.userScore, //用户评分
    userImg: req.body.userImg, //用户图片
  });
  if (result) {
    res.json({
      code: 200,
      msg: "修改成功",
    });
  } else {
    res.json({
      code: 202,
      msg: "修改失败",
    });
  }
});

//查询所有(带分页)
app.get("/userlist", async (req, res) => {
  // const start = req.query.start ? req.query.start : 0;
  // const end = req.query.end ? req.query.end : 0;
  // const num = await User.find();
  // const result = await User.find().skip(Number(start)).limit(Number(end));
  const result = await User.find();
  console.log(result);
  if (result) {
    res.json({
      code: 200,
      msg: result,
      // total: num.length,
    });
  } else {
    res.json({
      code: 201,
      msg: "获取失败或者无数据",
    });
  }
});

//查询指定id的数据
app.get("/useritem/:id", async (req, res) => {
  const id = req.params.id;
  const result = await User.findById(id);
  if (result) {
    res.json({
      code: 200,
      msg: result,
    });
  } else {
    res.json({
      code: 201,
      msg: "获取失败或者无数据",
    });
  }
});

//增
app.post("/useradd", async (req, res) => {
  const user = new User(req.body);
  const result = await user.save();
  console.log(result);
  if (result) {
    res.json({
      code: 200,
      msg: "添加成功",
    });
  } else {
    res.json({
      code: 201,
      msg: "添加失败",
    });
  }
});

app.listen(8888);
