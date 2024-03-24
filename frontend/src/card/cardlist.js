import React, { useState } from 'react';
import Card from './Card';
import './cardlist.css'; // Import your CSS file for styling

const CardList = () => {
  const [cards, setCards] = useState([
    { id: 1, tutorname: 'Card 1', rate: 'rate for card 1',yearsofexp:'years of experience: 2'},
    { id: 2, tutorname: 'Card 2', rate: 'rate for card 2' ,yearsofexp:'years of experience: 2'},
    { id: 3, tutorname: 'Card 3', rate: 'rate for card 3' ,yearsofexp:'years of experience: 2'},
    { id: 3, tutorname: 'Card 4', rate: 'rate for card 3' ,yearsofexp:'years of experience: 2'}
  ]);

  // Function to add a new card
  const addCard = () => {
    const newCard = {
      id: cards.length + 1,
      tutorname: `Card ${cards.length + 1}`,
      rate: `rate for card ${cards.length + 1}`,
      yearsofexp:'2'
    };
    setCards([...cards, newCard]);
  };

  return (    
    <div className='card-list'>
      {cards.map((card,index) => (
        <Card key={card.id} tutorname={card.tutorname} rate={card.rate} yearsofexp='years of experience: 2' className={`card-column-${index + 1}`} />
      ))}
    
    </div>
  );
}

export default CardList;