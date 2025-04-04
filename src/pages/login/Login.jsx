import React, { useState } from "react";
import "./Login.scss";
import Input from "../../component/common/input/Input";
import Button from "../../component/common/button/Button";
import { axiosClient } from "../../utils/axiosCLient";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  async function handleLoginfunction (){
   try {
      const response=await axiosClient.post('/auth/login',{
         email:email,
         password:password,
      })
      if(response){
         localStorage.setItem("accessToken",response.result.accessToken);
         navigate('/');
         setEmail("");
         setPassword("");
     }

   } catch (error) {
      console.log(error);
   }
  }

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
        <p>New user ? click on <strong onClick={()=> navigate("/signup")}> Signup </strong></p>
      </div>
    </div>
  );
}

export default Login;
