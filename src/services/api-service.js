export default class AviaApi {
  getSearchId = async () => {
    const res = await fetch(`https://front-test.beta.aviasales.ru/search`);
    const body = await res.json();
    return body.searchId;
  }
  
  getTickets = async () => {
    const id = await this.getSearchId();
    const res = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${id}`);
    const body = await res.json();
    return body.tickets.map(this.transformTicket).slice(0, 5);
  }

  transformTicket = (ticket) => {
    return {
      img: `//pics.avs.io/99/36/${ticket.carrier}.png`,
      price: ticket.price,
      dateDepart: ticket.segments[0].date,
      destinationDepart: ticket.segments[0].destination,
      durationDepart: ticket.segments[0].duration,
      originDepart: ticket.segments[0].origin,
      stopsDepart: ticket.segments[0].stops,
      dateReturn: ticket.segments[1].date,
      destinationReturn: ticket.segments[1].destination,
      durationReturn: ticket.segments[1].duration,
      originReturn: ticket.segments[1].origin,
      stopsReturn: ticket.segments[1].stops,
    }
  }
}