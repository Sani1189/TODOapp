import React from 'react'
import { useLocation } from 'react-router-dom'
import '../style/nav.css'
import Nav from '../components/Nav'
import '../style/event.css'

function Events() {
    const { state } = useLocation();
    const { uname } = state;

    return (
        <>
            <div className="header"></div>

            <Nav state={state}></Nav>
            <div className="event-content">
                <h1>
                    This page is under development <span>{uname}</span> !
                </h1>
            </div>

        </>
    )
}

export default Events