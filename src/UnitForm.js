import React, { useState } from "react";

const UnitForm = ({user, updateFn}) => {

    const initialState = {code: '', title: '', offering: []}

    const [formInfo, setFormInfo] = useState(initialState)

    const updateField = (event) => {
        // which input element is this
        const name = event.target.attributes.name.value
        console.log(name, event.target.value)
        if (name === "title") {
            setFormInfo({...formInfo, title: event.target.value})
        } else if (name === "code") {
            setFormInfo({...formInfo, code: event.target.value})
        } else if (name === "offering") {
            // The checkbox, look at the checked property to see if it 
            // is checked or not, then add or remove as necessary
            let offs = formInfo.offering
            console.log(event.target.checked, offs)
            if (event.target.checked) {
                // add it to the list if not present
                if (!offs.includes(event.target.value)) {
                    console.log("added to the list of offerings")
                    offs = [...formInfo.offering, event.target.value]
                } 
            } else {
                // remove it from the list if present
                if (offs.includes(event.target.value)) {
                    console.log("removed from the list of offerings")
                    offs = offs.filter(o => o !== event.target.value)
                }
            }
            console.log("Offerings now", offs)
            setFormInfo({...formInfo, offering: offs})
        }
    }

    const formHandler = (event) => {
        event.preventDefault()
        console.log("Form submitted: ", formInfo)
        updateFn(formInfo)
        setFormInfo(initialState)
    }
    
    if (user) {
        return (
            <form onSubmit={formHandler}>
                <hr/>
                <label htmlFor="code">
                    Unit Code:
                    <input type="text" name="code" onChange={updateField}/>
                </label>

                <label htmlFor="title">
                    Unit Title:
                    <input type="text" name="title" onChange={updateField}/>
                </label>

                <label htmlFor="offerings">Offerings:</label> <br/>
                <div class='checkOffering'>
                            <label>
                                <input type="checkbox" onChange={updateField} name="offering" value="S1"/>
                                S1
                            </label> 
                            <label>
                                <input type="checkbox" onChange={updateField} name="offering" value="S2"/>
                                S2
                            </label> 
                            <label>
                                <input type="checkbox" onChange={updateField} name="offering" value="S3"/>
                                S3
                            </label> 
                </div>


                <input type="submit"></input>
            </form>
        )
    } else {
        return (<p>Login to add a new unit</p>)
    }
}

export default UnitForm