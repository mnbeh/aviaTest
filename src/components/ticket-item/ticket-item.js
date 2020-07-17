import React, {Component} from 'react';
import './ticket-item.css';

export default class TicketItem extends Component {

  getDurationHours = (mins) => {
    let hours = Math.trunc(mins/60);
	  return hours;
  }

  getDurationMinutes = (mins) => {
	  let minutes = mins % 60;
	  return minutes;
  }

  getHourMin = (dateStr) => {
    let date = new Date(Date.parse(dateStr));
    return date.getHours() + ':' + date.getMinutes();
  }

  countHourMin = (dateStr, hours, minutes) => {
    let date = new Date(Date.parse(dateStr));
    date.setMinutes(date.getMinutes() + minutes);
    date.setHours(date.getHours() + hours);
    return date.getHours() + ':' + date.getMinutes();
  };

  render() {
    const { price, carrier, segments: [{origin, destination, date, stops, duration}, {origin: origin2, destination: destination2, date: date2, stops: stops2, duration: duration2}]} = this.props.tickets;
    const departureTime = this.getHourMin(date);
    const departureTime2 = this.getHourMin(date2);
    const stopsStr = stops.join(', ');
    const stopsStr2 = stops2.join(', ');
    const timeHours = this.getDurationHours(duration);
    const timeMinutes = this.getDurationMinutes(duration);
    const timeHours2 = this.getDurationHours(duration2);
    const timeMinutes2 = this.getDurationMinutes(duration2);
    const arrivedTime = this.countHourMin(date,timeHours,timeMinutes);
    const arrivedTime2 = this.countHourMin(date,timeHours2,timeMinutes2);
    const src = `//pics.avs.io/99/36/${carrier}.png`;
    return (
    <div className="ticket-item">
      <div className="flex">
      <div className="price">{`${price.toLocaleString()} P`}</div>
      <img src={src} alt="company"/>
      </div>
      <div className="flightInfo">
        <div className="flight-info-block">
          <div className="info">{`${origin} - ${destination}`}</div>
          <div className="data">{`${departureTime} - ${arrivedTime}`}</div>
        </div>
        <div className="flight-info-block">
          <div className="info">в пути</div>
          <div className="data">{`${timeHours}ч ${timeMinutes}м`}</div>
          </div>
        <div className="flight-info-block">
          <div className="info">{`${stops.length} пересадки`}</div>
          <div className="data">{stopsStr}</div>
          </div>
        <div className="flight-info-block">
          <div className="info">{`${origin2} - ${destination2}`}</div>
          <div className="data">{`${departureTime2} - ${arrivedTime2}`}</div>
        </div>
        <div className="flight-info-block">
          <div className="info">в пути</div>
          <div className="data">{`${timeHours2}ч ${timeMinutes2}м`}</div>
        </div>
        <div className="flight-info-block">
          <div className="info">{`${stops2.length} пересадки`}</div>
          <div className="data">{stopsStr2}</div>
        </div>
      </div>
    </div>
  );
  };
};