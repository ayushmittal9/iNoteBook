import React  from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const handlelogout = ()=>{
    localStorage.removeItem('token')
        navigate('/login')
  }
  return (
    <nav className="navbar navbar-expand-lg bg-light navbar-light shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand lead">
          <mark>
            <strong>iNotebook</strong>
          </mark>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/home">
              Home
            </Link>
            <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">
              About
            </Link>
          </div>
        </div>
        
        
        {!localStorage.getItem('token')?<form className="d-flex">
         <Link className="btn btn-success" to="/signup" type="submit">
            <i className="fa-solid fa-user"></i>
         </Link>
         </form>:<button className="btn btn-success" onClick={handlelogout} to="/logout">logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
