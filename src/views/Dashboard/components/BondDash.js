import React from 'react';
import './bondDash.css';
const BondDash = () => {
  return (
    <div className="bond-content-jt">
      <div className="bond-box-jt">
        <p>Current Price: (Bomb)^2</p>
        <div>BBOND = 12</div>
      </div>
      <div className="bond-box-jt">
        <p>Available to redeem: </p>
        <div>BBOND = 12</div>
      </div>
      <div className="bond-box-btn-jt">
        <div className="btn-container-jt">
          <div className="btn-content">
            <p>Purchase BBond</p>
            <p>Bomb is over peg</p>
          </div>
          <button>Purchase</button>
        </div>
        <div></div>
        <div className="btn-container-jt">
          <div className="btn-content">
            <p>Purchase BBond</p>
            <p>Bomb is over peg</p>
          </div>
          <button>Purchase</button>
        </div>
      </div>
    </div>
  );
};

export default BondDash;