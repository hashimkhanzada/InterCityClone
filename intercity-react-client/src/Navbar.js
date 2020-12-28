import React from 'react'
import './Navbar.css'
import Avatar from "@material-ui/core/Avatar"

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar__left">
                <div className="navbar__logo">
                    <img
                    className="navbar__logo"
                    src="https://www.intercity.co.nz/resources/themes/intercity/images/intercity-logo.svg"
                    alt="" /> 
                </div>

                <div className="navbar__booking">
                    <h4>BOOK</h4> 
                    <h4>MANAGE</h4>
                </div>
                
                <div className="navbar__info">
                    <h5>Day Tours</h5>
                    <h5>FlexiPass</h5>
                    <h5>TravelPass</h5>
                    <h5>Contact</h5>
                    <h5>Help  Info</h5>
                </div>
            </div>
            
            <div className="navbar__right"> 
                    <Avatar />
                    <h5>Log in</h5> 
                
            </div>
            
 

            
        </div>
    )
}

export default Navbar
