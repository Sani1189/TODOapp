import React from 'react'
import '../style/login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';


function Login() {
    const [umail, setumail] = useState("");
    const [upassword, setupassword] = useState("");
    const navigate =useNavigate();

    const login = () => {
        Axios.post("http://localhost:3002/login", {
            umail: umail,
            upassword: upassword,
        }).then((response) => {
            if (response.data.message) {
              toast.error("Invalid email or password",{
                position:toast.POSITION.TOP_CENTER
              });
              setumail("");
              setupassword("");
            } else {
                navigate("/home", { state: {uname:response.data[0].uname, umail:response.data[0].umail} });
            }
        });
    };
    const register = () => {
        navigate("/register");
    }
    return (
        <div className="logindetails">
          <div className="loginhead">
            <h1>ToDo List</h1>
          </div>
    
          <div className="center">
            <h1>Login</h1>
            <div className="form">
              <div className="txt-field">
                <input type="text" onChange={(e)=>{
                  setumail(e.target.value);
                }} value={umail} />
                <label>Enter email</label>
              </div>
              <div className="txt-field">
                <input type="password" onChange={(e)=>{
                  setupassword(e.target.value);
                }} value={upassword} />
                <label>Enter Password</label>
              </div>
              <button onClick={login} className="loginbtn">
                Login
              </button>
              <button onClick={register} className="registerbtn"> Register
              </button>
            </div>
          </div>
          <ToastContainer />
        </div>
      );
}

export default Login