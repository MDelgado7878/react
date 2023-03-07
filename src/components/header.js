import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/headerStyles.css";
import logo from "./resources/logo-download.png";

const Header = () => {
    return (
        <header className="head">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="logo">
                            <img src={logo} alt="logo" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;