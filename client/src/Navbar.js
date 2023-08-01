import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
    return (
        <>
            <div className="navbar">
                <Link to="/" className="navbar-link">
                    Upload
                </Link>
                <Link to="/gallery" className="navbar-link">
                    Gallery
                </Link>
                <Link to="/album" className="navbar-link">
                    Album
                </Link>
            </div> 
        </>
    )
}

export default Navbar;