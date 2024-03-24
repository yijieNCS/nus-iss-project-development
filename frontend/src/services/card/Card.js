// Card.js

import React from 'react';

const Card = ({ tutorname, rate, yearsofexp,className  }) => {
  return (
    <div className='card'>
      <h2>{tutorname}</h2>
      <p>{rate}</p>
      <p>{yearsofexp}</p>

    </div>
  );
}

export default Card;
