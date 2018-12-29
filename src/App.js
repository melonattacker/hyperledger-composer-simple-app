import React, { Component } from 'react';
import './App.css';
import Client from './Client.js';

class App extends Component {
  
  constructor() {
    super()
    this.state = {
      traders: []
    }
    this.handleTraderInputChange = this.handleTraderInputChange.bind(this)
  }

  componentWillMount = () => {
    this.getTrader()
  }

  handleTraderInputChange = event => {
    const {target: {name, value}} = event
    this.setState({
      [name]: value
    });
  }

  getTrader = async() => {
    Client.search('Trader')
    .then(data => {
      this.setState({
        traders: data
      })
    })
  }

  submitTrader = () => {
    const data = {
      "$class": "org.acme.landowner.Trader",
      "email": this.state.email,
      "firstName": this.state.firstName,
      "lastName": this.state.lastName,
      "type": this.state.type
    }

    Client.create('Trader', data)
    .then(() => {
      this.getTrader()
    })
  }

  render() {
    return(
      <div className="App">
        <h2>Add Trader</h2>
        <p>email:</p>
        <input 
          onChange={this.handleTraderInputChange}
          type="text"
          name="email" />
        <p>firstName:</p>
        <input 
          onChange={this.handleTraderInputChange}
          type="text"
          name="firstName" />
        <p>lastName:</p>
        <input 
          onChange={this.handleTraderInputChange}
          type="text"
          name="lastName" />
        <p>type:</p>
        <input
          onChange={this.handleTraderInputChange}
          type="text"
          name="type" />
        <button onClick={this.submitTrader}>Create New Trader</button>

        <div style={{justifyContent: 'space-around'}}>
          <div>
            <h2>Trader List</h2>
            {this.state.traders.map((r, i) => (
              <div 
                style={{border: '1px solid black'}}
                key={i}>
              <p>email: {r.email}</p>
              <p>firstName: {r.firstName}</p>
              <p>lastName: {r.lastName}</p>
              <p>type: {r.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default App;

