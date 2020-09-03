import React from "react";

const Unit = ({unit, deleteFn}) => {

    console.log(unit)

  return (
    <div class='unitDisplay'>
      <li>
        {unit.code}: {unit.title}; Available in {unit.offering.map(o => <span key={o}> {o} </span>)}
        <button onClick={() => deleteFn(unit)}>Delete</button>
      </li>
    </div>
  )

}

export default Unit