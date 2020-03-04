const express = require("express");
const multer = require("multer");
const path = require("path");
const Posts = require('../models').Posts;
const router = express.Router();

// 파일 저장을 위한 설정
const storage = multer.diskStorage({
    // file destination 수정
    destination: function(req, file ,callback){
        callback(null, "video_content")
    },
    // 저장 될 파일 이름 설정
    filename: function(req, file, callback){
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        let date_now = new Date();
        let d_Month = date_now.getMonth() + 1;
        d_Month = (parseInt(d_Month / 10, 10) == 0) ? "0" + d_Month : d_Month;
        const d_Day = (parseInt(date_now.getDate() / 10, 10) == 1) ? "0" + date_now.getDate() : date_now.getDate();

        // 파일명_년월일_시분초.확장자 로 파일을 저장한다
        callback(null, basename + "_" + date_now.getFullYear() + d_Month + d_Day + "_"
         + date_now.getHours() + date_now.getMinutes() + date_now.getSeconds() + extension);
    }
})

// multer 미들웨어 경로 등록
const upload = multer({ storage });

// post register
router.post("/register", upload.single("video_upload"), async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const category = req.body.category;
    const video_file = req.file.filename;	// 파일의 경로를 db에 넣을거임
    const userId = req.session.u_id;
    const userinfoId = req.session.userinfo_id;
    
    try {
        const insert_result = await Posts.create({
            title,
            content,
            category,
            video_file,
            userId,
            userinfoId
        });

        res.json({ resultCode: true, msg: "글 등록이 완료되었습니다" });
    } catch (err) {
        // 에러 처리
        console.log(err);
        res.json({ resultCode: false, msg: "글 등록이 실패했습니다" });
    }
});

module.exports = router;