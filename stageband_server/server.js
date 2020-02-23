const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
    origin: true,
    credentials: true
}
app.use(cors(corsOptions));

/* app.use(session({
    resave:false,
    saveUninitialized:true,
    secret:"타인은 지옥이다",
    cookie:{
        httpOnly:true,
        secure:false
    }
})); */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routers
app.use("/", require("./routes/index"));
app.use("/user", require("./routes/user"));

app.listen(8080, () => {
    console.log("Server Ready!");
});