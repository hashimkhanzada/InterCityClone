import React from 'react'
import "./FormInput.css"

function FormInput({placeholderText}) {
    return (
        <div className="formInput">
            <div className="formInput__input">
                <input placeholder={placeholderText}/>
            </div>
        </div>
    )
}

export default FormInput
