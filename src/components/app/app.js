import React, {Component} from 'react';
import './app.css';
import AviaApi from '../../services/api-service';

import FilterMenu from '../filter-menu/filter-menu';
import SortMenu from '../sort-menu/sort-menu';
import Tickets from '../tickets/tickets';

export default class App extends Component {
  state = {
    tickets: [],
    error: false,
    loading: true,
    cheapSort: '',
    fastSort: '',
    filterAll: true,
    filterZero: false,
    filterOne: false,
    filterTwo: false,
    filterThree: false
  };

  api = new AviaApi();

  priceSort = () => {
    this.setState(({tickets}) => {
      const newArray = tickets.slice();
      const sortedArr = newArray.sort((a,b) => a.price-b.price);
      return {
        tickets: sortedArr,
        cheapSort: 'activeSort',
        fastSort: '',
      }
    });
  };

  speedSort = () => {
    this.setState(({tickets}) => {
      const newArray = tickets.slice();
      const sortedArr = newArray.sort((a,b) => a.segments[0].duration-b.segments[0].duration);
      return {
        tickets: sortedArr,
        cheapSort: '',
        fastSort: 'activeSort',
      }
    })
  }

  filterClick = (title) => {
    this.setState((state) => {
      const newFilter = !state[`filter${title}`]
      if ((state.filterAll === true) && (title !== 'All')) {
        return {
          [`filter${title}`]: newFilter,
          filterAll: false
        }
      }
      if ((title === 'All')) {
        return {
          [`filter${title}`]: newFilter,
          filterZero: false,
          filterOne: false,
          filterTwo: false,
          filterThree: false
        }
      }
      return {
        [`filter${title}`]: newFilter
      }
    });
  }

  onFilter = (tickets) => {
    let filterZero = [];
    let filterOne = [];
    let filterTwo = [];
    let filterThree = [];
    if (this.state.filterAll === true) {
      return tickets;
    }
    if (this.state.filterZero === true) {
      filterZero = tickets.filter((item) => item.segments[0].stops.length === 0);
    }
    if (this.state.filterOne === true) {
      filterOne = tickets.filter((item) => item.segments[0].stops.length === 1);
    }
    if (this.state.filterTwo === true) {
      filterTwo = tickets.filter((item) => item.segments[0].stops.length === 2);
    }
    if (this.state.filterThree === true) {
      filterThree = tickets.filter((item) => item.segments[0].stops.length === 3);
    }
    return [...filterZero, ...filterOne, ...filterTwo, ...filterThree];
  }


  componentDidMount() {
    this.api.getTickets().then((tickets) => this.setState({tickets, loading: false})).catch(() => this.setState({error: true, loading: false}))
  };

  render() {
    const { cheapSort, fastSort, tickets, error, loading} = this.state;
    const visibleItems = this.onFilter(tickets);
    const hasData = !(loading || error);
    const errorMessage = error ? <div>Пожалуйста, перезагрузите страницу</div> : null;
    const loadingMessage = loading ? <div>Пожалуйста, ожидайте</div> : null;
    const ticketsView = hasData ? <Tickets tickets={visibleItems} /> : null;
    return (
    <div className="app">
      <FilterMenu filterClick={this.filterClick} />
      <div>   
        <SortMenu onPriceSort={this.priceSort} onSpeedSort={this.speedSort} cheapSort={cheapSort} fastSort={fastSort} />
        {errorMessage}
        {loadingMessage}
        {ticketsView}
      </div>
    </div>
  );
  };
};