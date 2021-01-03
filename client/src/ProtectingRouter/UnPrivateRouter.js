import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

//dùng để xác định đã đăng nhập rồi thì ko vào trang login hoặc trang đăng ký đc

//roles dùng để xác định tuyến đường này thì user hay admin mới đc truy cập hoặc cả hai đều đc truy cập
//...rest dùng để lưu lại tất cả các property là component và roles
const UnPrivateRouter = ({ component: Component, ...rest }) => {
  //kiểm tra xem đã được xác thực hay là đăng nhập chưa, và xem đó là tài khoản loại gì
  const { isAuthenticated } = useContext(AuthContext);

  return (
    //chuyền vào một cái props bằng biến ...rest trc đó đã lưu các property vào
    // sau đó dùng một chỗ dựa đc gọi là render và sẽ thực hiện một callback và sẽ thực hiện một chức năng
    //và chức năngn này sẽ quyết định là sẽ render cái gì
    <Route
      {...rest}
      render={(props) => {
        //nếu đã đc xác thực hoặc đã đăng nhập
        //redirect to pathname:"/" sẽ đưa ta đến trang chủ
        //state from: props.location cho ta biết cá nhân này đến từ đâu
        if (isAuthenticated)
          return (
            <Redirect
              to={{ pathname: "/", state: { from: props.location } }}
            />
          );

        //cuối cùng là đã thoả mãn hết các điều kiện thì sẽ sao chép props để vào component mà chúng ta muốn render
        return <Component {...props} />;
      }}
    />
  );
};

export default UnPrivateRouter;
