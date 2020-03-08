const express = require("express");
const router = express.Router();

const models = require("../models");
const Users = require("../models").Users;
const UserInfo = require("../models").UserInfo;
const Posts = require("../models").Posts;

// userinfo process
router.get("/userinfo", async (req, res, next) => {
    try{
        const userinfo_id = req.session.userinfo_id;

        const userinfo_result = await UserInfo.findOne({ where : { id: userinfo_id }});

        if(userinfo_result){
            const post_result = await Posts.findAll({ 
                where : { userId: req.session.u_id },
                order: [[ "createdAt", "DESC" ]],
            });

            if(post_result){
                res.json({ 
                    resultCode: true,
                    nickname: userinfo_result.nickname,
                    intro: userinfo_result.intro,
                    profile_file: userinfo_result.profile_file,
                    posts: post_result,
                });
            }
        } else {
            res.json({ resultCode: false, msg: "유저 정보 찾기 실패" });
        }
    } catch (err) {
        // 에러 처리
        console.log(err);
    }
});

// signup process
router.post("/signup", async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const nickname = req.body.nickname;
    const intro = req.body.intro;

    try {
        // 이메일 중복 조회, Users table insert, UserInfo table insert
        await models.sequelize.transaction (async (t) => {
            // 1. 이메일 중복 조회
            const search_result = await Users.findOne({ where : { email }});
            if(!search_result)
            {
                // 2. UserInfo table insert 
                const userinfo_result = await UserInfo.create({ nickname, intro, });

                // 3. User table insert
                await Users.create({ email, password, userinfo_id: userinfo_result.id });
            } 
        });
        
        res.json({ resultCode: true, msg: "가입이 완료되었습니다" });
    } catch (err) {
        // error 처리
        resultCode = 0;
        res.json({ resultCode: false, msg: "회원가입에 문제가 생겼습니다." });
        console.log(err);
    }
});

// logout process
router.get("/logout", (req, res, next) => {
    req.session.destroy(() => {
        res.json({ resultCode: true });
    });
});

// login process
router.post("/login", async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        // 1. email을 조건으로 조회
        const search_result = await Users.findOne({ where : { email }});
        if(search_result){
            if (search_result.password !== password){
                res.json({ resultCode: false, msg: "비밀번호가 틀립니다" });
            }
            // 2.닉네임 조회 
			const nickname_result = await UserInfo.findOne({ 
                where : { id: search_result.userinfo_id },
                attributes: ['nickname']
            });
            
            // 세션에 id, email, nickname 넣기
            req.session.u_id = search_result.id;
            req.session.userinfo_id = search_result.userinfo_id;
        	req.session.nickname = nickname_result.nickname;
            req.session.email = email;
            
            res.json({ resultCode: true, msg: `${email}님 환영합니다!` });
        } else {
            res.json({ resultCode: false, msg: "이메일이 존재하지 않습니다" });
        }
 } catch (err) {
        // 에러 처리
     console.log(err);
    }
});

module.exports = router;