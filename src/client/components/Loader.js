/**
 *    Loader.js & Loader.scss from
 *    https://codepen.io/charlottejoy/details/aEwKMB
 */

import React from 'react';
import './Loader.scss';

const Loader = () => (
  <div className="container">
    <div className="game-area">
      <div className="flash" />
      <div className="blue-fall-row">
        <div className="block  fall1" />
        <div className="block  fall2" />
        <div className="block  fall3" />
        <div className="block  fall4" />
      </div>
      <div className="yellow-row">
        <div className="block  y1" />
        <div className="block y2" />
        <div className="block  y3" />
        <div className="block y4" />
      </div>
      <div className="blue-stay-row">
        <div className="block  stay1" />
        <div className="block stay2" />
        <div className="block  stay3" />
      </div>
      <div className="red-row">
        <div className="block r1" />
        <div className="block r2" />
        <div className="block r3" />
        <div className="block r4" />
      </div>
    </div>
    <div className="message">
      <h1>Leveling up...</h1>
    </div>

  </div>
);

export default Loader;
