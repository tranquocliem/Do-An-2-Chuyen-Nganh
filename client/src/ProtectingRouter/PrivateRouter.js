import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

//dùng để bảo vệ các tuyến đường phải đăng nhập mới truy cập đc

//roles dùng để xác định tuyến đường này thì user hay admin mới đc truy cập hoặc cả hai đều đc truy cập
//...rest dùng để lưu lại tất cả các property là component và roles
const PrivateRouter = ({ component: Component, roles, ...rest }) => {
  //kiểm tra xem đã được xác thực hay là đăng nhập chưa, và xem đó là tài khoản loại gì
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    //chuyền vào một cái props bằng biến ...rest trc đó đã lưu các property vào
    // sau đó dùng một chỗ dựa đc gọi là render và sẽ thực hiện một callback và sẽ thực hiện một chức năng
    //và chức năngn này sẽ quyết định là sẽ render cái gì
    <Route
      {...rest}
      render={(props) => {
        //nếu chưa đc xác thực hoặc chưa đăng nhập
        //redirect to pathname:"/login" sẽ đưa ta đến trang đăng nhập
        //state from: props.location cho ta biết cá nhân này đến từ đâu
        if (!isAuthenticated)
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        //nếu đc xác thực r nhưng nếu đường dẫn này chỉ dành cho admin truy cập thì user ko đc vào và sẽ trả về trang chủ
        if (!roles.includes(user.role))
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        //cuối cùng là đã thoả mãn hết các điều kiện thì sẽ sao chép props để vào component mà chúng ta muốn render
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRouter;
