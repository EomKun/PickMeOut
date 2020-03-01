const express = require("express");
const multer = require("multer");
const path = require("path");
const Posts = require('../models').PostApply;
const router = express.Router();

const storage = multer.diskStorage({
    // file destination 수정
    destination: function(req, file ,callback){
        callback(null, "upload_video")
    },
    // 저장 될 파일 이름 설정
    filename: function(req, file, callback){
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        let date_now = new Date();
        let d_Month = date_now.getMonth() + 1;
        d_Month = (parseInt(d_Month / 10, 10) == 0) ? "0" + d_Month : d_Month;
        const d_Day = (parseInt(date_now.getDate() / 10, 10) == 1) ? "0" + date_now.getDate() : date_now.getDate();

        callback(null, basename + "_" + date_now.getFullYear() + d_Month + d_Day + "_"
         + date_now.getHours() + date_now.getMinutes() + date_now.getSeconds() + extension);
    }
})

// multer 미들웨어 경로 등록
const upload = multer({ storage });

// post register
router.post("/register", upload.single("upload_file"), async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const category = req.body.category;
    const nickname = req.session.nickname;
    const file_name = req.file.filename;
    const userId = req.session.u_id;
    
    try {
        const insert_result = await Posts.create({
            title,
            content,
            category,
            nickname,
            file_name,
            userId
        });

        res.json({ msg: true });
    } catch (err) {
        res.json({ msg: false });
        console.log(err);
    }

    res.json({msg: false});
});

module.exports = router;