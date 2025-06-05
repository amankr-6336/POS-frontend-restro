import React, { useState } from "react";
import "./Login.scss";
import Input from "../../component/common/input/Input";
import Button from "../../component/common/button/Button";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addNotification } from "../../redux/notificationSlice/NotificationSlice";
// import { ownerInfo } from "../../redux/UserSlice/UserReducer";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { handleLogin } from "../../services/Auth.api";
import useApi from "../../hooks/useApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  
  const handleLoginApi=useApi(handleLogin);

  async function handleLoginfunction() {
    try {
      const {success,data}= await handleLoginApi.execute({email,password});
      if (success) {
        localStorage.setItem("accessToken", data.result.accessToken);
        navigate("/dashboard/setting");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  // async function getNotification(restaurantId) {
  //   try {
  //     const response = await axiosClient.get("/notification/get-notice", {
  //       params: { restaurantId },
  //     });
  //     console.log(response);
  //     if (response) {
  //       dispatch(addNotification(response.result));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div className="login">
      <div className="form-section">
        <div className="form-heading">
          <p>Login</p>
        </div>
        <div className="form-input">
          <Input label="Email" type="email" value={email} onChange={setEmail} />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />
        </div>

        <div className="form-button-navigation">
          <Button size="small" onClick={handleLoginfunction}>
            Login
          </Button>
        </div>

        <div className="other-option">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential);
              console.log("User Info:", decoded);
              console.log(credentialResponse.credential);
              
            }}
            onError={() => {
              console.log("login failed");
            }}
          />
        </div>

        <p>
          New user ? click on{" "}
          <strong onClick={() => navigate("/signup")}> Signup </strong>
        </p>
      </div>
    </div>
  );
}

export default Login;
