const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const AccountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      min: 3,
      max: 25,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    role: {
      type: String,
      enum: ["spadmin", "admin", "candidate", "recruiter"],
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    resetLink: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

//mã hoá mật khẩu khi lưu vào csdl
AccountSchema.pre("save", function (next) {
  //đã được mã hoá rồi thì ko làm gì
  if (!this.isModified("password")) return next();
  //chưa mã hoá
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) return next(err);
    //ghi đè mật khẩu củ bằng mật khẩu mới
    this.password = passwordHash;
    next();
  });
});

//viết hàm so sánh mật khẩu từ người nhập và mật khẩu mã hoá trong CSDL
AccountSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    else {
      //không giống nhau
      if (!isMatch) return cb(null, isMatch);
      return cb(null, this);
    }
  });
};

module.exports = mongoose.model("Account", AccountSchema);
