import React from 'react';
import './sort-menu.css';

const SortMenu = ({cheapSort, fastSort, onPriceSort, onSpeedSort}) => {
    return (
    <div className="sort-menu">
      <div className={`cheap ${cheapSort}`} onClick={onPriceSort}>Самый дешевый</div>
      <div className={`fast ${fastSort}`} onClick={onSpeedSort}>Самый быстрый</div>      
    </div>
  );

};

export default SortMenu;