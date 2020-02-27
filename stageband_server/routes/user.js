const express = require("express");
const models = require("../models");
const Users = require('../models').Users;
const UserInfo = require('../models').UserInfo;
const router = express.Router();

// info process
/* router.post("/info", (req, res, next) => {
    try{
        await models.sequelize.transaction (async (t) => {
            // 1. Users -> userinfo_id 조회
            const search_result1 = await Users.findOne({ where : { id }});
            console.log(search_result);
            if(!search_result)
            {
                // 2. User table insert
                const insert_result1 = await Users.create({
                    email,
                    password,
                });

                console.log(insert_result1);
                if(insert_result1){
                    // 3. UserInfo table insert 
                    const insert_result2 = await UserInfo.create({
                        nickname,
                        intro_content,
                        profile_photo_link: "path"
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
    } catch (err) {
        console.log(err);
    }
}); */

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
                // 2. User table insert
                const insert_result1 = await Users.create({
                    email,
                    password,
                });
                
                if(insert_result1){
                    // 3. UserInfo table insert 
                    const insert_result2 = await UserInfo.create({
                        nickname,
                        intro_content,
                        profile_photo_link: "path"
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
        
        res.json({ resultCode, msg });
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
        resultCode = 1;
        
        req.session.id = search_result.id;
        req.session.email = search_result.email;

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