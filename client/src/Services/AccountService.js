import axios from "axios";

export default {
  login: (user) => {
    return axios
      .post("/api/account/login", user)
      .then((res) => {
        if (res.status !== 401) {
          return res.data;
        } else {
          return {
            isAuthenticated: false,
            user: { username: "", role: "" },
            message: { msgBody: "Error", msgError: true },
          };
        }
      })
      .catch((err) => {
        return {
          message: {
            msgBody: "Sai tài khoản hoặc mật khẩu",
            msgError: true,
          },
        };
      });
  },
  sendMail: (user) => {
    return axios
      .post("/api/account/sendMail", user)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return {
          message: {
            msgBody: "Có lỗi khi đăng ký tài khoản",
            msgError: true,
          },
          err,
        };
      });
  },
  register: (user) => {
    return axios
      .post("/api/account/register", user)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return {
          message: {
            msgBody: "Tạo tài khoản không thành công",
            msgError: true,
          },
          err,
        };
      });
  },
  forgetPass: (email) => {
    return axios
      .post("/api/account/forgetPass", email)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return {
          message: {
            msgBody: "Có lỗi khi gửi mail",
            msgError: true,
          },
          err,
        };
      });
  },
  resetPass: (variable) => {
    return axios
      .post("/api/account/resetPass", variable)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        return {
          message: {
            msgBody: "Có lỗi khi gửi đặt lại mật khẩu",
            msgError: true,
          },
          err,
        };
      });
  },
  logout: () => {
    return axios.get("/api/account/logout").then((res) => {
      return res.data;
    });
  },
  // isAuthenticated: () => {
  //   return axios
  //     .get("/api/account/authenticated")
  //     .then((res) => {
  //       if (res.status !== 401) return res.data;
  //       else {
  //         return { isAuthenticated: false, user: { username: "", role: "" } };
  //       }
  //     })
  //     .catch((err) => {
  //       return {
  //         isAuthenticated: false,
  //         user: { username: "", role: "", email: "" },
  //       };
  //     });
  // },

  isAuthenticated: () => {
    return fetch("/api/account/authenticated").then((res) => {
      //nếu phản hồi từ máy chủ khác 401 thì chúng ta mới gửi lại phản hồi và sau đó nhận lại đc data
      //401 -> passport sẽ tự gửi nếu chúng ta không đc xác thực
      if (res.status !== 401) return res.json().then((data) => data);
      //ngược lại
      else {
        return { isAuthenticated: false, user: { username: "", role: "" } };
      }
    });
  },
};
