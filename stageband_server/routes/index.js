const express = require("express");
const Users = require('../models').Users;
const UserInfo = require('../models').UserInfo;
const Posts = require('../models').PostApply;
const router = express.Router();

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