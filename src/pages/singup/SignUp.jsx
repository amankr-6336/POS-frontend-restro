import React, { useState } from "react";
import "./SignUp.scss";
import Input from "../../component/common/input/Input";
import Button from "../../component/common/button/Button";
import { axiosClient } from "../../utils/axiosCLient";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { handlesignin } from "../../services/Auth.api";
import useApi from "../../hooks/useApi";

function SignUp() {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const signInApi = useApi(handlesignin);

  async function handleCreateAccount() {
    try {
      const { success, data } = await signInApi.execute({
        userName,
        email,
        password,
      });
      if (success) {
        localStorage.setItem("accessToken", data.result.accessToken);
        navigate("/dashboard/setting");
        setEmail("");
        setName("");
        setPassword("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignUpGoogle(token) {
    try {
      const response = await axiosClient.post("/auth/google/signup", {
        token,
      });
      console.log(response);
      if (response) {
        localStorage.setItem("accessToken", response.result.accessToken);
        navigate("/dashboard/setting");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="signup">
      <div className="form-section">
        <div className="form-heading">
          <p>Sign Up</p>
        </div>
        <div className="form-input">
          <Input label="Name" type="text" value={userName} onChange={setName} />
          <Input label="Email" type="email" value={email} onChange={setEmail} />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />
        </div>

        <div className="form-button-navigation">
          <Button size="small" onClick={handleCreateAccount}>
            Sign Up
          </Button>
        </div>
        <div className="other-option">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const token = credentialResponse.credential;
              handleSignUpGoogle(token);
            }}
            onError={() => {
              console.log("login failed");
            }}
          />
        </div>
        <p>
          Already have an Account ?{" "}
          <strong onClick={() => navigate("/login")}>Login</strong>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
