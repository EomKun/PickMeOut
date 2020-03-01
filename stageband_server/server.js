const express = require("express");
const session = require("express-session");
const cors = require("cors");
const sequelize = require("./models").sequelize;
const app = express();

const corsOptions = {
    origin: true,
    credentials: true
}
app.use(cors(corsOptions));

sequelize.sync();

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret:"타인은 지옥이다",
    cookie:{
        httpOnly:true,
        secure:false
    }
}));

app.use('/upload_video', express.static('upload_video'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routers
app.use("/", require("./routes/index"));
app.use("/user", require("./routes/user"));
app.use("/post", require("./routes/post"));

app.listen(8080, () => {
    console.log("Server Ready!");
});