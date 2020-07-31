import React from 'react';
import './sort-menu.css';

const SortMenu = ({sortName, onSort}) => {

    const sortFilters = [{name: 'cheap', label: 'Самый дешевый', id: 1},
                         {name: 'speed', label: 'Самый быстрый', id: 2}];
    return (
    <div className="sort-menu">
      {sortFilters.map(({name,id,label}) => {
        const isActive = sortName === name ? 'activeSort' : '';
        return (<div key={id} className={`sort ${isActive}`} onClick={() => onSort(name)}>{label}</div>)
      })}
    </div>
  );

};

export default SortMenu;