const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStratery = require("passport-jwt").Strategy;
const Account = require("../models/Account");
const NodeRSA = require("node-rsa");
const fs = require("fs");
const path = require("path");

//lấy mã token từ trình duyệt được lưu trong cookies
const cookieExtractor = (req, res) => {
  let token = null;
  let tokenJWT = null;
  if (req && req.cookies) {
    token = req.cookies["temp"];
    if (token) {
      try {
        private_key = fs.readFileSync(
          path.resolve(__dirname, "./privatekey.key")
        );
        let key_private = new NodeRSA(private_key);
        tokenJWT = key_private.decrypt(token, process.env.PRIVATE_KEY);
      } catch (error) {}
    }
  }
  return tokenJWT;
};

//Authorization
passport.use(
  new JwtStratery(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.SECRET_KEY,
    },
    (payload, done) => {
      Account.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
      });
    }
  )
);

//Authentication sử dụng username hoặc email và password
passport.use(
  new LocalStrategy((username, password, done) => {
    Account.findOne(
      { $or: [{ username }, { email: username }] },
      (err, user) => {
        if (err) return done(err);
        //không tồn tại
        if (!user) return done(null, false);
        user.comparePassword(password, done);
      }
    );
  })
);
