const express = require("express");
const router = express.Router();

router.post("/login", (req, res, next) => {
    const email = req.body.email;
    const pw = req.body.pw;

    res.json({
        msg: `${email}님의 비번: ${pw}`,
    });
});

module.exports = router;