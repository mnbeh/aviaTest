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
    const { price, img, dateDepart, destinationDepart, 
      durationDepart, originDepart, stopsDepart, dateReturn,
      destinationReturn, durationReturn, originReturn, stopsReturn } = this.props.ticket;
    const departureTime = this.getHourMin(dateDepart);
    const departureTime2 = this.getHourMin(dateReturn);
    const stopsStr = stopsDepart.join(', ');
    const stopsStr2 = stopsReturn.join(', ');
    const timeHours = this.getDurationHours(durationDepart);
    const timeMinutes = this.getDurationMinutes(durationDepart);
    const timeHours2 = this.getDurationHours(durationReturn);
    const timeMinutes2 = this.getDurationMinutes(durationReturn);
    const arrivedTime = this.countHourMin(dateDepart,timeHours,timeMinutes);
    const arrivedTime2 = this.countHourMin(dateReturn,timeHours2,timeMinutes2);
    return (
    <div className="ticket-item">
      <div className="flex">
      <div className="price">{`${price.toLocaleString()} P`}</div>
      <img src={img} alt="company"/>
      </div>
      <div className="flightInfo">
        <div className="flight-info-block">
          <div className="info">{`${originDepart} - ${destinationDepart}`}</div>
          <div className="data">{`${departureTime} - ${arrivedTime}`}</div>
        </div>
        <div className="flight-info-block">
          <div className="info">в пути</div>
          <div className="data">{`${timeHours}ч ${timeMinutes}м`}</div>
          </div>
        <div className="flight-info-block">
          <div className="info">{`${stopsDepart.length} пересадки`}</div>
          <div className="data">{stopsStr}</div>
          </div>
        <div className="flight-info-block">
          <div className="info">{`${originReturn} - ${destinationReturn}`}</div>
          <div className="data">{`${departureTime2} - ${arrivedTime2}`}</div>
        </div>
        <div className="flight-info-block">
          <div className="info">в пути</div>
          <div className="data">{`${timeHours2}ч ${timeMinutes2}м`}</div>
        </div>
        <div className="flight-info-block">
          <div className="info">{`${stopsReturn.length} пересадки`}</div>
          <div className="data">{stopsStr2}</div>
        </div>
      </div>
    </div>
  );
  };
};