import React, { useState } from 'react';
import Card from './Card';

const CardList = () => {
  const [cards, setCards] = useState([
    { id: 1, tutorname: 'Card 1', rate: 'rate for card 1',yearsofexp:'years of experience: 2'},
    { id: 2, tutorname: 'Card 2', rate: 'rate for card 2' ,yearsofexp:'years of experience: 2'},
    { id: 3, tutorname: 'Card 3', rate: 'rate for card 3' ,yearsofexp:'years of experience: 2'}
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
    <div>
      <button onClick={addCard}>Add Card</button>
      <div className="card-list">
        {cards.map(card => (
          <Card key={card.id} tutorname={card.tutorname} rate={card.rate} yearsofexp='years of experience: 2' />
        ))}
      </div>
    </div>
  );
}

export default CardList;