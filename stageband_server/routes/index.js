const express = require("express");
const Posts = require('../models').PostApply;
const router = express.Router();

// 인기 게시물 전달
router.get("/videopost", async (req, res, next) => {
    try{
        const result = await Posts.findOne({ order: [["createdAt", "DESC"]] });
        res.json({ 
            id: result.id,
            title: result.title,
            content: result.content,
            category: result.category,
            nickname: result.nickname,
            createdAt: result.createdAt,
            file_name: result.file_name,
        });
    } catch (err) {
        console.log(err);
        res.json({ post: false });
    }
});

// 전체 게시물 또는 카테고리에 맞는 게시물 요청
router.post("/board", async (req, res, next) => {
    try {
        const result = req.body.category === ""? 
            await Posts.findAll({ order: [["createdAt", "DESC"]] }) :
            await Posts.findAll({ 
                where: { category: req.body.category },
                order: [["createdAt", "DESC"]]
            });
        res.json({ posts: result });
    } catch (err) {
        console.log(err);
        res.json({ posts: false });
    }
});

module.exports = router;