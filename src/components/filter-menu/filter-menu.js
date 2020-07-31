import React from 'react';
import './filter-menu.css';

const FilterMenu = (props) => {
  const checkbox = [
    { name: "all", label: 'Все', id: 1},
    { name: "zero", label: 'Без пересадок', id: 2},
    { name: "one", label: '1 пересадка', id: 3},
    { name: "two", label: '2 пересадки', id: 4},
    { name: "three", label: '3 пересадки', id: 5},
  ];

  const onChange = (name) => {
    props.onFilter(name);
  };

  return (
    <div className="filter-menu">
      <div className="header">Количество пересадок</div>
        {checkbox.map(({name, id, label}) => {

        return (
          <div className="checkbox-item" key={id}>
          <label>
           <input
            onChange={() => onChange(name)}
            name={name}
            type="checkbox"
            checked={props[name]}
           />
           {label}
           </label>
           </div>
         );
        })}
      </div>
  );
};

export default FilterMenu;