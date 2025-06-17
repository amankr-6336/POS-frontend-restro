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
import illustration from "../../asset/loginIllus-removebg-preview.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleLoginApi = useApi(handleLogin);

  async function handleLoginfunction() {
    try {
      const { success, data } = await handleLoginApi.execute({
        email,
        password,
      });
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
      <div className="box">
        <div className="illustration-section">
          <img src={illustration} alt="" />
          <h3>Manage Sales and Inventory and other instruction</h3>
        </div>

        <div className="form-section">
          <div className="form-heading">
            <h4>Welcome Back</h4>
            <p>Please login to Continue</p>
          </div>
          <div className="form-input">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
            />
          </div>

          <div className="form-button-navigation">
            <Button  onClick={handleLoginfunction}>
              <p style={{fontWeight:"600"}}>Login</p>
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

          <p style={{fontSize:"0.7rem",fontWeight:"500",color:"#808080"}}>
            New user ? click on{" "}
            <strong onClick={() => navigate("/signup")}> Signup </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
