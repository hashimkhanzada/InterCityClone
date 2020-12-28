import React from 'react'
import './HeroSection.css'
import FormInput from "./FormInput"
import { Button } from "@material-ui/core"

function HeroSection() {
    return (
        <div>
            <div className="hero">
                <div className="hero__bookingContainer">
                    <h2>Where would you like to go?</h2>
                    <div className="hero__bookingForm">
                        <div className="row1">
                            <FormInput placeholderText="From"/>
                            <FormInput placeholderText="To"/>
                        </div>
                        <div className="row2">
                            <FormInput placeholderText="Departure Date"/>
                            <FormInput placeholderText="Passengers"/>
                        </div>
                        
                        <div className="hero__button">
                            <Button variant="outlined">Search</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
