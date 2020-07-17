import React, {Component} from 'react';
import './tickets.css';

import TicketItem from '../ticket-item/ticket-item';

export default class Tickets extends Component {

  render() {
    return (
    <div>
      {this.props.tickets.map((item, i) => <span key={i}><TicketItem tickets={item} /></span>)}
    </div>
  );
  };
};