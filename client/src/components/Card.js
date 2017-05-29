import React from 'react';

const Card = ({ updateCard, flipped, matched, icon, index, allowClick }) => {

  let clickCard =() => {
    if(flipped === false && matched === false && allowClick === true){
      updateCard(index, true);
    }
  }

  return(
    <div
      className='col-xs-3 text-center'
      style={{ height: '300px', border: '1px solid black'}}
      onClick={clickCard}
      >
      {flipped && <img src={icon} style={{height:'150px', marginTop:'50px'}} /> }

    </div>
  )
};

export default Card;
