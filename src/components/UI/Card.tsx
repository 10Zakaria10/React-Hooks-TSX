import React from 'react';

import './Card.css';

interface Prop {
  children : React.ReactNode;
}

const Card = (props:Prop) => {
  return <div className="card">{props.children}</div>;
};

export default Card;
