import React, { useState } from 'react'
import '../style/nav.css'
import { AiOutlineHome } from 'react-icons/ai';
import { GiNotebook } from 'react-icons/gi';
import { BiMoviePlay } from 'react-icons/bi';
import { RiCalendarEventLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';

function Nav(props) {

    const state = props.state;
    const navigate = useNavigate();
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    return (
        <div className={sidebar ? "sidebar active" : "sidebar"}>
            <button className="hamburger" type="button" onClick={showSidebar}>
                <div></div>
            </button>
            <ul onClick={showSidebar}>
                <li>
                    <a onClick={() => {
                        navigate('/home', { state })
                    }}><AiOutlineHome /><span>Home</span></a>
                </li>
                <li>
                    <a onClick={() => {
                        navigate('/notes', { state })
                    }}><GiNotebook /><span>Notes</span></a>
                </li>
                <li>
                    <a onClick={() => {
                        navigate('/movies', { state })
                    }}><BiMoviePlay /><span>Movies to watch</span></a>
                </li>
                <li>
                    <a onClick={() => {
                        navigate('/events', { state })
                    }}><RiCalendarEventLine /><span>Events</span></a>
                </li>
                <li>
                    <a onClick={() => {
                        navigate('/')
                    }}><BiLogOut /><span>Logout</span></a>
                </li>
            </ul>
        </div>
    )
}

export default Nav