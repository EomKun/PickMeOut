const express = require("express");
const router = express.Router();

// logout process
router.get("/logout", (req, res, next) => {
    req.session.destroy(() => {
        res.json({ resultCode: true });
    });
});

// login process
router.post("/login", (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    req.session.email = email;
    
    res.json({
        msg: `이메일: ${email}, 비밀번호: ${password}`,
    });
});

module.exports = router;