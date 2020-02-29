const express = require("express");
const models = require("../models");
const Users = require('../models').Users;
const UserInfo = require('../models').UserInfo;
const Posts = require('../models').PostApply;
const router = express.Router();

// userinfo process
router.get("/userinfo", async (req, res, next) => {
    try{
        const id = req.session.u_id;
        let msg;

        await models.sequelize.transaction (async (t) => {
            // 1. Users -> userinfo_id 조회
            const user_result = await Users.findOne({ where : { id }});
            if(user_result)
            {
                // 2. UserInfo 조회
                const userinfo_result = await UserInfo.findOne({ where : { id: user_result.userinfo_id }});
                
                // 3. User가 쓴 글 조회
                const post_result = await Posts.findAll({ where : { userId: id }});

                res.json({ 
                    resultCode: true,
                    nickname: userinfo_result.nickname,
                    intro: userinfo_result.intro_content,
                    posts: post_result,
                });
            }
        });
    } catch (err) {
        console.log(err);
    }
});

// signup process
router.post("/signup", async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.pw;
    const nickname = req.body.nickname;
    const intro_content = req.body.intro;

    try {
        let resultCode = 1;
        let msg = "";
        
        // 이메일 중복 조회, User table insert, UserInfo table insert
        await models.sequelize.transaction (async (t) => {
            // 1. 이메일 중복 조회
            const search_result = await Users.findOne({ where : { email }});
            if(!search_result)
            {
                // 2. UserInfo table insert 
                const userinfo_insert_result = await UserInfo.create({
                    nickname,
                    intro_content,
                    profile_photo_link: "path"
                });

                if(userinfo_insert_result){
                    // 3. User table insert
                    const user_insert_result = await Users.create({
                        email,
                        password,
                        userinfo_id: userinfo_insert_result.id
                    });
                } else {
                    resultCode = 0;
                    msg = "넣는데 문제생김"
                }
            } else {
                resultCode = 0;
                msg = "이메일 중복";
            }
        });
        
        res.json({ resultCode, msg: "회원가입이 완료되었습니다" });
    } catch (err) {
        resultCode = 0;
        res.json({ resultCode, msg: false });
        console.log(err);
    }
});

// login process
router.post("/login", async (req, res, next) => {
    const email = req.body.email;
    const pw = req.body.pw;

    let msg = "";
    let resultCode;

    const search_result = await Users.findOne({ where : { email }});
    if(search_result) {
        const nickname_result = await UserInfo.findOne({ 
            where : { id: search_result.userinfo_id },
            attributes: ['nickname']
        });
        resultCode = 1;
        
        req.session.u_id = search_result.id;
        req.session.email = search_result.email;
        req.session.nickname = nickname_result.nickname;
        
        msg = `${search_result.email}님 환영합니다!`;
    } else {
        resultCode = 0;
        msg = "이메일 또는 비밀번호가 틀립니다";
    }

    res.json({ resultCode, msg });
});

// logout
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ msg: true });
    });
});

module.exports = router;