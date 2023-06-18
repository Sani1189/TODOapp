import React from 'react';
import { useLocation } from 'react-router-dom';
import Nav from '../components/Nav';
import '../style/home.css';
import picture from '../picture/todo.png';


function Home() {
  const { state } = useLocation();
  const { uname, umail } = state;

  return (
    <>
      <div className="head">
        <h2>
          Let's Get Started {uname}!
        </h2>
        </div>
      <Nav state={state}></Nav>
      <div className="content">
        <div className="home-content">
        <img src={picture} className="picture" alt="todolist" />
        <h1>Welcome To TODOLIST</h1>
        <h3>Note Down Your Task here and make life easy!</h3>
      </div>
      </div>
    </>
  );
}

export default Home;
