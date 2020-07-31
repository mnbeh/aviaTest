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
    sortName: 'cheap',
    filterall: true,
    filterzero: false,
    filterone: false,
    filtertwo: false,
    filterthree: false,
  };

  api = new AviaApi();


  onFilter = (filterName) => {
    this.setState((state) => {
      const newFilter = !state[`filter${filterName}`]
      if ((state.filterall === true) && (filterName !== 'all')) {
        return {
          [`filter${filterName}`]: newFilter,
          filterall: false
        }
      }
      if ((filterName === 'all')) {
        return {
          [`filter${filterName}`]: newFilter,
          filterzero: false,
          filterone: false,
          filtertwo: false,
          filterthree: false
        }
      }
      return {
        [`filter${filterName}`]: newFilter
      }
    });
  }

  filterTickets = (arr) => {
    let zeroArr = [];
    let oneArr = [];
    let twoArr = [];
    let threeArr = [];
    if (this.state.filterall) {
      return arr;
    }
    if (this.state.filterzero) {
      zeroArr = arr.filter((item) => item.segments[0].stops.length === 0)
    };
    if (this.state.filterone) {
      oneArr = arr.filter((item) => item.segments[0].stops.length === 1)
    };
    if (this.state.filtertwo) {
      twoArr = arr.filter((item) => item.segments[0].stops.length === 2)
    };
    if (this.state.filterthree) {
      threeArr = arr.filter((item) => item.segments[0].stops.length === 3)
    };

    return [...zeroArr, ...oneArr, ...twoArr, ...threeArr];
  }

  onSort = (sortName) => {
    this.setState({sortName});
  }

  sortItems = (items) => {
    return this.state.sortName === 'cheap' ? items.sort((a,b) => a.price-b.price) 
                                            : items.sort((a,b) => a.segments[0].duration-b.segments[0].duration)
  };

  componentDidMount() {
    this.api.getTickets().then((tickets) => this.setState({tickets, loading: false})).catch(() => this.setState({error: true, loading: false}))
  };

  render() {
    const { tickets, error, loading, filterall,filterzero, filterone, filtertwo, filterthree, sortName} = this.state;
    const visibleItems = this.sortItems(this.filterTickets(tickets));
    const hasData = !(loading || error);
    const errorMessage = error ? <div>Ошибка в JSON! Пожалуйста, перезагрузите страницу</div> : null;
    const loadingMessage = loading ? <div>Пожалуйста, ожидайте</div> : null;
    const ticketsView = hasData ? <Tickets tickets={visibleItems} /> : null;
    return (
    <div className="app">
      <FilterMenu onFilter={this.onFilter}
       all={filterall}
       zero={filterzero}
       one={filterone}
       two={filtertwo}
       three={filterthree} />
      <div>   
        <SortMenu sortName={sortName} onSort={this.onSort} />
        {errorMessage}
        {loadingMessage}
        {ticketsView}
      </div>
    </div>
  );
  };
};





  // priceSort = () => {
  //   this.setState(({tickets}) => {
  //     const newArray = tickets.slice();
  //     const sortedArr = newArray.sort((a,b) => a.price-b.price);
  //     return {
  //       tickets: sortedArr,
  //       cheapSort: 'activeSort',
  //       fastSort: '',
  //     }
  //   });
  // };

  // speedSort = () => {
  //   this.setState(({tickets}) => {
  //     const newArray = tickets.slice();
  //     const sortedArr = newArray.sort((a,b) => a.segments[0].duration-b.segments[0].duration);
  //     return {
  //       tickets: sortedArr,
  //       cheapSort: '',
  //       fastSort: 'activeSort',
  //     }
  //   })
  // }