const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const Account = require("./models/Account");

require("dotenv").config({
  path: "./configs/.env",
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    store:
      process.env.NODE_ENV === "production"
        ? new RedisStore({
            url: process.env.REDIS_URL,
          })
        : null,
    secret: "sdjkfgydjfkyguergdf6g56d+8y9+7rt3478ui4jkdsgf",
    resave: true,
    saveUninitialized: true,
  })
);
//kết nối với database

// const db = require("./configs/key").mongoURI;
const db = "mongodb://localhost:27017/DACS2";

mongoose
  .connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected...."))
  .catch((err) => console.log(err));

//đường dẫn các api
app.use("/uploads", express.static("uploads"));
app.use("/api/account", require("./routers/Account"));
app.use("/api/recruitment", require("./routers/Recruitment"));
app.use("/api/city", require("./routers/City"));
app.use("/api/career", require("./routers/Career"));
app.use("/api/profile", require("./routers/Profile"));
app.use("/api/cv", require("./routers/CV"));
app.use("/api/admin", require("./routers/Admin"));

// const Account = require("./models/Account");

// for (let i = 1; i <= 50; i++) {
//   Account.create({
//     username: `ungvien${i}`,
//     email: `ungvien${i}@gmail.com`,
//     password: "123456",
//     role: "candidate",
//   });
// }

//sử dụng khi môi trường là production dành để deploy ứng dụng
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client", "build", "index.html"));
  });
}

//đặt port cho server
const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server Run With Port ${PORT}`));
