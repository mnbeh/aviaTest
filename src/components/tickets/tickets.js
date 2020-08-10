import React from 'react';
import './tickets.css';

import TicketItem from '../ticket-item/ticket-item';

const Tickets = ({tickets}) => {

  return (
    <div>
      {tickets.map((ticket) => <span key={ticket.price+ticket.durationDepart}><TicketItem ticket={ticket} /></span>)}
    </div>
  );

};

export default Tickets;