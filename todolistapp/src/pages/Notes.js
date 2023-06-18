import React from 'react'
import { useLocation } from 'react-router-dom'
import '../style/nav.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from '../components/Nav'
import Container from 'react-bootstrap/Container'

import '../style/notes.css'
import { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'

function Notes() {
  const { state } = useLocation();
  const { umail, uname } = state;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState([]);
  const [mydes, setMydes] = useState("");

  const loaddata = () => {
    axios.get(`http://localhost:3002/getnotes/${umail}`).then((response) => {
      setNotes(response.data);
    });
  };

  useEffect(() => {
    loaddata();
  });

  const addnote = () => {
    if (title === "" || description === "") {
      toast.error("Please enter title and description!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500
      });
    } else {
      axios.post("http://localhost:3002/addnotes", {
        title: title,
        description: description,
        umail: umail
      }).then((response) => {
        toast.success("Note added successfully!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500
        });
        setTitle("");
        setDescription("");
      });
    }
  }

  const deletenote = (id) => {
    axios.delete(`http://localhost:3002/deletenotes/${id}`).then((response) => {
      toast.success("Note deleted successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500
      });
      loaddata();
      setMydes("");
    });
  }

  const showdescriptions = (id) => {
    let tempdes = notes.filter((note) => note.id === id);
    setMydes("Title: " + tempdes[0].ntitle + "\n Description: " + tempdes[0].ndescription);
  }


  return (
    <>
      <div className="header">
        <h2>
          user: {uname} || status: active
        </h2>
      </div>

      <Nav state={state}></Nav>

      <Container className="content">
        <div className="add-notes">
          <h1>Add your notes</h1>
          <div className="create-notes">
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <button onClick={addnote} className="btn">Add</button>
          </div>
        </div>
        <div className="notes">
          <h1>Your notes</h1>
          <div className="notes-list">
            <div className="note-title">
              {notes.length > 0 ?
                <ul>
                  <h3>Note titles</h3>
                  {notes.map((note) => (
                    <li key={note.id}>
                      <span>{note.ntitle}</span>
                      <button onClick={()=>showdescriptions(note.id)} className="viewbtn">View</button>
                      <button onClick={()=>deletenote(note.id)} className="dltbtn">Delete</button>
                    </li>
                  ))}
                </ul>
                :
                <h3>No notes found</h3>
              }
            </div>
            <div className="note-description">
              <h3>Note Details</h3>
              <textarea placeholder="Description" value={mydes} ></textarea>

            </div>
          </div>

        </div>

      </Container>
      <ToastContainer />
    </>
  );
}

export default Notes