const express = require("express");
const session = require("express-session");
const sequelize = require("./models").sequelize;
const cors = require("cors");
const app = express();

// CORS option
const corsOptions = {
    origin: true,			// 헤더 요청 구성, true값은 요청 origin 반영
    credentials: true		// 헤더를 전달하려면 true
}

app.use(cors(corsOptions));

// sequelize
sequelize.sync();

// session
app.use(session({
    resave:false,           // 세션을 변경되지 않아도 무조건 저장할 지 정하는 값(false 권장)
    saveUninitialized:true, // 세션이 저장되기 전에 uninitialized 상태로 미리 만들어서 저장
    secret:"로또 1등!",     // 쿠키를 임의로 변조하는것을 방지하기 위한 값 
    cookie:{
        httpOnly:true,      // HttpOnly Set-Cookie 속성
        secure:false        // 쿠키 보안 설정(https 사용시 true 설정)
    }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static
app.use('/profile', express.static('profile_content'));
app.use('/video', express.static('video_content'));

// router
app.use("/user", require("./routes/user"));
app.use("/post", require("./routes/post"));

app.listen(8080, () => {
    console.log("Server Ready!");
});