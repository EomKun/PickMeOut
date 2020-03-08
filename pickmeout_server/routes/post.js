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

///////////////////////////////////////////////////////////////////////////////
// process
///////////////////////////////////////////////////////////////////////////////

// Posts req process
router.post("/", async (req, res, next) => {
    try {
        let result;

        if(req.body.category === ""){
            // 전체
            result = await Posts.findAll({
                order: [[ "createdAt", "DESC" ]],
            });
        }  else {
            // 카테고리 별
            result = await Posts.findAll({ 
                where: { category: req.body.category },
                order: [[ "createdAt", "DESC"]],
            });
        }
        
        res.json({ resultCode: true, posts: result });
    } catch (err) {
        // 에러 처리
        console.log(err);
        res.json({ resultCode: false, msg: "게시글을 불러오지 못했습니다" });
    }
});

// popular post process
router.get("/popularpost", async (req, res, next) => {
    try{
        // 일단은 가장 최근 게시물을 가져오도록 함
        const result = await Posts.findOne({ order: [["createdAt", "DESC"]] });
        res.json({ 
            resultCode: true,
            p_id: result.id,
            title: result.title,
            content: result.content,
            category: result.category,
            nickname: result.nickname,
            createdAt: result.createdAt,
            video_file: result.video_file,
        });
    } catch (err) {
        // err 표시
        console.log(err);
        res.json({ resultCode: false, msg: "게시글이 없습니다" });
    }
});

// post register
// single안의 값은 formData의 key와 같아야 한다
router.post("/register", upload.single("video_upload"), async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const category = req.body.category;
    const nickname = req.session.nickname;
    const video_file = req.file.filename;	// 파일의 경로를 db에 넣을거임
    const userId = req.session.u_id;
    
    try {
        const insert_result = await Posts.create({
            title,
            content,
            category,
            nickname,
            video_file,
            userId,
        });

        res.json({ resultCode: true, msg: "글 등록이 완료되었습니다" });
    } catch (err) {
        // 에러 처리
        console.log(err);
        res.json({ resultCode: false, msg: "글 등록이 실패했습니다" });
    }
});

module.exports = router;