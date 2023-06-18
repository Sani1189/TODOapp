import React from 'react'
import '../style/register.css'
import { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';


function Register() {
    const [uname, setuname] = useState("");
    const [umail, setumail] = useState("");
    const [upassword, setupassword] = useState("");
    const [conpassword, setconpassword] = useState("");
    const navigate = useNavigate();

    const addUser = () => {
        if(uname==="" || umail==="" || upassword==="" || conpassword===""){
            toast.error("Please fill all the fields",{
                position:toast.POSITION.TOP_CENTER
            });
        }else if(upassword!==conpassword){
            toast.error("Password does not match",{
                position:toast.POSITION.TOP_CENTER
            });
        }else{
            axios.post("http://localhost:3002/register", {
                uname: uname,
                umail: umail,
                upassword: upassword,
            }).then((response) => {
                if(response.data==="error"){
                    toast.error("Email already exists",{
                        position:toast.POSITION.TOP_CENTER
                    });
                }else{
                    toast.success("Registered successfully");
                    setumail("");
                    setuname("");
                    setupassword("");
                    setconpassword("");
                }
            });
        }
    }
    const goToLogin = () => {
        console.log("Go to login page");
        navigate("/");
    }

    return (
        <div className="register">
            <h1>Register for ToDoList</h1>
            <div className="myform">
                <div className="myform-body">
                    <label>Enter Name</label>
                    <input type="text" onChange={(e)=>{
                        setuname(e.target.value);
                    }} value={uname} />
                    <label>Enter Email</label>
                    <input type="text" onChange={(e)=>{
                        setumail(e.target.value);
                    }} value={umail} />
                    <label>Enter Password</label>
                    <input type="password" onChange={(e)=>{
                        setupassword(e.target.value);
                    }} value={upassword} />
                    <label>Confirm Password</label>
                    <input type="password" onChange={(e)=>{
                        setconpassword(e.target.value);
                    }} value={conpassword} />
                    <button onClick={addUser} className="mybtn">Register</button>
                    <button onClick={goToLogin} className="mybtn">Go to login page</button>
                </div>
            </div>

            <ToastContainer />
        </div>

    )
}

export default Register