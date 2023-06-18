import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css';
import Notes from './pages/Notes';
import Movies from './pages/Movies';
import Events from './pages/Events';
import Register from './pages/Register';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/notes" element={<Notes/>} />
        <Route path="/movies" element={<Movies/>} />
        <Route path="/events" element={<Events/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
