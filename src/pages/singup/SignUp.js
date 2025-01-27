import React, { useState } from "react";
import "./SignUp.scss";
import Input from "../../component/common/input/Input";
import Button from "../../component/common/button/Button";
import { axiosClient } from '../../utils/axiosCLient';
import { useNavigate } from "react-router-dom";

function SignUp() {
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    
    const navigate=useNavigate();
   
    

    async function handleCreateAccount(){
        try {
            const response= await axiosClient.post('/auth/signup',{
                name:name,
                email:email,
                password:password
            })
            console.log(response);
            if(response){
                localStorage.setItem("accessToken",response.result.accessToken);
                navigate('/');
                setEmail("");
                setName("");
                setPassword("");
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
          <Input label="Name" type="text" value={name} onChange={setName} />
          <Input label="Email" type="email" value={email} onChange={setEmail} />
          <Input label="Password" type="password" value={password} onChange={setPassword} />
        </div>

        <div className="form-button-navigation">
            <Button size="small" onClick={handleCreateAccount}>
                Sign Up
            </Button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
