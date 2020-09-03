import React, { useState, useEffect } from "react";
import UnitForm from "./UnitForm.js"
import Unit from "./Unit.js"
import unitService from './services/units'
import LoginForm from './LoginForm'


const App = () => {
  
  const [units, setUnits] = useState([])
  const [user, setUser] = useState(null)

  const addNewUnit = (newUnit) => {

  unitService.create(newUnit)
    .then(data => {
      console.log("POST response", data)
      setUnits([...units, data])
    })
  }

  useEffect(() => {
    unitService.getAll()
    .then((data) => {
      console.log("response: ", data)
      setUnits(data)
    })
  },[])

  const deleteUnit = (unit) => {
    unitService.delete(unit.id)
    .then(data => {
      console.log("delete succeeded")
      // delete local copy
      const newUnits = units.filter(u => u.id !== unit.id)
      setUnits(newUnits)
    })
  }

  return (
    <div className="App">

      
      <LoginForm user={user} setUser={setUser}/>
      <hr/>
      
      <h2>Unit Offerings</h2>

      <ul>
       {units.map((unit) => (<Unit key={unit.id} unit={unit} deleteFn={deleteUnit}/>))}
      </ul>

      <UnitForm user={user} updateFn={addNewUnit}/>

    </div>
  );
}

export default App;
