import React, {Component} from 'react';
import './filter-menu.css';

export default class FilterMenu extends Component {

  state = {
    filters: [
      {name: 'Все', title: 'All', id:1 },
      {name: 'Без пересадок', title: 'Zero', id:2 },
      {name: '1 пересадка', title: 'One', id:3 },
      {name: '2 пересадки', title: 'Two', id:4 },
      {name: '3 пересадки', title: 'Three', id:5 },
    ],
  }

  render() {
    return (
    <div className="filter-menu">
      <div className="header">Количество пересадок</div>
      {this.state.filters.map(({name, title, id}) => {
       return  <div className="checkbox-item" key={id}><label><input type="checkbox" onClick={() => this.props.filterClick(title)} />{name}</label></div> 
      } )}
      </div>
  );
  };
};