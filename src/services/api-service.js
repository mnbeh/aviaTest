export default class AviaApi {
  async getSearchId() {
    const res = await fetch(`https://front-test.beta.aviasales.ru/search`);
    const body = await res.json();
    return body.searchId;
  }
  
  async getTickets() {
    const id = await this.getSearchId();
    const res = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${id}`);
    const body = await res.json();
    return body.tickets;
  }

  
}