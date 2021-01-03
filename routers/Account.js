const express = require("express");
const accRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../configs/passport");
const JWT = require("jsonwebtoken");
const Account = require("../models/Account");
const bcrypt = require("bcrypt");
const lodash = require("lodash");
const nodemailer = require("nodemailer");

//gửi mail để xác thực
accRouter.post("/sendMail", (req, res) => {
  const { email, username, role } = req.body;

  Account.findOne(
    { $or: [{ username: username }, { email: email }] },
    (err, user) => {
      if (err) {
        res.status(400).json({
          message: {
            msgBody: "Có lỗi khi tìm kiếm với CSDL 1",
            msgError: true,
          },
        });
        return;
      } else if (user) {
        if (user.username === username) {
          res.status(201).json({
            message: {
              msgBody: "Tên đăng nhập đã tồn tại",
              msgError: true,
            },
          });
        } else {
          res.status(201).json({
            message: {
              msgBody: "Email đã tồn tại",
              msgError: true,
            },
          });
        }
      } else if (role === "spadmin" || role === "admin") {
        res.status(201).json({
          message: {
            msgBody: "Không có loại tài khoản này",
            msgError: true,
          },
        });
      } else {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "tranquocliem12c6@gmail.com",
            pass: process.env.pass,
          },
        });

        const token = JWT.sign(
          {
            username,
            email,
            role,
          },
          process.env.JWT_ACCOUNT_ACTIVATION,
          {
            expiresIn: "10m",
          }
        );

        const mainOptions = {
          // thiết lập đối tượng, nội dung gửi mail
          // <p>Link: ${process.env.CLIENT_URL}/activate/${token}&150999</p>
          from: "tranquocliem12c6@gmail.com",
          to: email,
          subject: "Kích Hoạt Tài Khoản",
          html: `
                        <h1>Vui Lòng Xử Dụng Đường Link Phía Dưới Để Kích Hoạt Tài Khoản</h1>
                        <p>Link: <a href="http://localhost:3000/activate/${token}&150999">Click Vào Đây!!!</a></p>
                        <h3 style="color:red;">Lưu ý: Đường Link Này Chỉ Có Thời Hạn Là 10 Phút Sau Thời Hạn Sẽ Không Còn Hiệu Lực Nũa!!!</h3>
                        <hr />
                        <p>Xin gửi lời cảm ơn đến bạn!!!</p>
                    `,
        };

        // console.log(token);

        transporter.sendMail(mainOptions, (err) => {
          if (err) {
            res.status(400).json({
              success: false,
              message: {
                msgBody: "Có lỗi khi gửi mail",
                msgError: true,
              },
              err,
            });
            return;
          } else {
            return res.status(200).json({
              success: true,
              message: {
                msgBody: "Đăng ký thành công",
                msgError: false,
              },
            });
          }
        });
      }
    }
  );
});

//tạo tài khoản cho loại candidate và recruiter (cần gửi xác thực mail)
accRouter.post("/register", (req, res) => {
  const { token, password, confirmPass } = req.body;

  if (token) {
    JWT.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: {
            msgBody: "Có lỗi với token",
            msgError: true,
          },
          err,
        });
      } else {
        if (password && confirmPass && password == confirmPass) {
          const { username, email, role } = JWT.decode(token);
          const newAccount = new Account({ email, username, password, role });

          newAccount.save((err) => {
            if (err) {
              return res.status(401).json({
                success: false,
                message: {
                  msgBody: "Có lỗi khi thêm tạo tài khoản này",
                  msgError: true,
                },
                err,
              });
            } else {
              return res.status(200).json({
                success: true,
                message: {
                  msgBody: "Tạo tài khoản thành công",
                  msgError: false,
                },
              });
            }
          });
        } else if (!password && !confirmPass) {
          return res.status(203).json({
            success: false,
            message: {
              msgBody: "Vui lòng không bỏ trống mật khẩu và xác nhận mật khẩu",
              msgError: true,
            },
          });
        } else if (!password) {
          return res.status(203).json({
            success: false,
            message: {
              msgBody: "Vui lòng không bỏ trống mật khẩu",
              msgError: true,
            },
          });
        } else if (!confirmPass) {
          return res.status(203).json({
            success: false,
            message: {
              msgBody: "Vui lòng không bỏ trống xác nhận mật khẩu",
              msgError: true,
            },
          });
        } else if (password != confirmPass) {
          return res.status(203).json({
            success: false,
            message: {
              msgBody: "Hai mật không khớp với nhau. Vui lòng nhập lại",
              msgError: true,
            },
          });
        }
      }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: {
        msgBody: "Tạo tài khoản thất bại",
        msgError: true,
      },
    });
  }
});

//tạo tài khoản cho loại candidate và recruiter (không cần gửi xác thực mail)
// accRouter.post("/register", (req, res) => {
//   const { email, username, password, role } = req.body;
//   Account.findOne(
//     { $or: [{ username: username }, { email: email }] },
//     (err, user) => {
//       if (err)
//         res.status(500).json({
//           message: {
//             msgBody: "Có lỗi khi tìm kiếm với CSDL 1",
//             msgError: true,
//           },
//         });
//       else if (user) {
//         res.status(201).json({
//           message: {
//             msgBody: "Tên đăng nhập hoặc email đã tồn tại",
//             msgError: true,
//           },
//         });
//       } else if (role === "spadmin" || role === "admin") {
//         res.status(201).json({
//           message: {
//             msgBody: "Không có loại tài khoản này",
//             msgError: true,
//           },
//         });
//       } else {
//         const newAccount = new Account({ email, username, password, role });
//         newAccount.save((err) => {
//           if (err)
//             res.status(500).json({
//               message: {
//                 msgBody: "Có lỗi khi thêm tài khoản vào CSDL 2",
//                 msgError: true,
//                 err,
//               },
//             });
//           else
//             res.status(200).json({
//               message: {
//                 msgBody: "Tạo tài khoản thành công",
//                 msgError: false,
//               },
//             });
//         });
//       }
//     }
//   );
// });

//login
const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "QuocLiem",
      sub: userID,
    },
    "QuocLiem",
    { expiresIn: "1d" }
  );
};

accRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role, status } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res
        .status(200)
        .json({ isAuthenticated: true, user: { _id, username, role, status } });
    }
  }
);

//logout
accRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "", role: "" }, success: true });
  }
);

//đổi mật khẩu tài khoản
accRouter.post(
  "/changePass",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { old_Password, password, configPassword } = req.body;
    const { username, email } = req.user;
    Account.findOne(
      { $or: [{ username: username }, { email: email }] },
      (err, user) => {
        if (err || !user) {
          return res.status(500).json({
            message: {
              msgBody: "Lỗi hoặc tài khoản không tồn tại",
              msgError: true,
            },
            err,
          });
        }
        if (password !== configPassword) {
          return res.status(400).json({
            message: {
              msgBody: "Mật khẩu xác nhận không đúng",
              msgError: true,
            },
          });
        }
        //cần nhập pass củ và so sánh với pass với csdl
        bcrypt.compare(
          old_Password,
          req.user.password,
          function (err, isMatch) {
            console.log(err);
          }
        );
        bcrypt.compare(
          old_Password,
          req.user.password,
          function (err, isMatch) {
            if (err) {
              res.status(400).json({
                message: {
                  msgBody: "Có Lỗi!!!",
                  msgError: true,
                },
                err,
              });
            }
            if (!isMatch) {
              res.status(400).json({
                isMatch: isMatch,
                message: {
                  msgBody: "Mật khẩu cũ không đúng",
                  msgError: true,
                },
              });
            } else {
              const updatePassword = {
                password: password,
              };
              user = lodash.extend(user, updatePassword);
              user.save((err, result) => {
                if (err) {
                  return res.status(500).json({
                    message: {
                      msgBody: "Lỗi thêm không thành công",
                      msgError: true,
                    },
                    err,
                  });
                }
                res.status(200).json({
                  message: {
                    msgBody: "Thay Đổi Mật Khẩu Thành Công",
                    msgError: false,
                  },
                });
              });
            }
          }
        );
      }
    );
  }
);

//tài khoản đang hiện hành
accRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { _id, username, role, status } = req.user;
    res.status(200).json({
      isAuthenticated: true,
      user: {
        _id,
        username,
        role,
        status,
      },
    });
  }
);

module.exports = accRouter;
