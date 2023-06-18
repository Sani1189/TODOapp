const express = require('express');
const mysql = require('mysql');
const app = express();
var cors = require('cors');
app.use(cors());
app.use(express.json());



const db=mysql.createConnection({
    host: "localhost",
    user: "sqluser",
    password: "password",
    database: "todoapp",
});

app.post('/login', (req, res) => {
    const umail = req.body.umail;
    const upassword = req.body.upassword;
    db.query(
        "SELECT * FROM userdetails WHERE umail = ? AND upassword = ?",
        [umail, upassword],
        (err, result) => {
            if (err) {
                res.send({err});
            }else {
                if (result.length > 0) {
                    res.send(result);
                } else {
                    res.send({message: "Wrong username/password combination!"});
                }
            }
        }
    );
});
app.get('/getmovies/:umail', (req, res) => {
    const umail = req.params.umail;
    db.query(
        "SELECT id,movie,view FROM movies WHERE umail = ?",
        [umail],
        (err, result) => {
            if (err) {
                res.send({err});
            }else {
                if (result.length > 0) {
                    res.send(result);
                } else {
                    res.send({message: "No movies"});
                }
            }
        }
    );
})
app.delete('/deletemovie/:id', (req, res) => {
    const id = req.params.id;
    db.query(
        "DELETE FROM movies WHERE id = ?",
        [id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});
app.put('/updatemovie/:id', (req, res) => {
    const id = req.params.id;
    db.query(
        "UPDATE movies SET view = 'yes' WHERE id = ?",
        [id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});


app.post('/addmovie', (req, res) => {
    const umail = req.body.umail;
    const movie= req.body.movie;
    const view = req.body.view;
    db.query(
        "INSERT INTO movies (umail, movie, view) VALUES (?,?,?)",
        [umail, movie, view],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Movie added successfully!");
            }
        }
    );
});
app.post('/addnotes', (req, res) => {
    const umail = req.body.umail;
    const ntitle = req.body.title;
    const ndescription = req.body.description;
    db.query(
        "INSERT INTO mynotes (umail, ntitle, ndescription) VALUES (?,?,?)",
        [umail, ntitle, ndescription],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Note added successfully!");
            }
        }
    );
});
app.delete('/deletenotes/:id', (req, res) => {
    const id = req.params.id;
    db.query(
        "DELETE FROM mynotes WHERE id = ?",
        [id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

app.get('/getnotes/:umail', (req, res) => {
    const umail = req.params.umail;
    db.query(
        "SELECT id,ntitle,ndescription FROM mynotes WHERE umail = ?",
        [umail],
        (err, result) => {
            if (err) {
                res.send({err});
            }else {
                if (result.length > 0) {
                    res.send(result);
                } else {
                    res.send({message: "No notes"});
                }
            }
        }
    );
})


app.post('/register', (req, res) => {
    const umail = req.body.umail;
    const uname = req.body.uname;   
    const upassword = req.body.upassword;
    db.query(
        "INSERT INTO userdetails (umail, uname, upassword) VALUES (?,?,?)",
        [umail,uname, upassword],
        (err, result) => {
            if (err) {
                res.send("error");
            } else {
                res.send("Values Inserted");
            }
        }

    );
});

app.listen(3002,()=>{
    console.log("running on port 3002");
  })
