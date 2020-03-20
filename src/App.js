import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { throwStatement } from '@babel/types';
import { func } from 'prop-types';

const HostUrl = "https://priceapi.moneycontrol.com"
const paths = {
  "NIFTY": "/pricefeed/notapplicable/inidicesindia/in%3BNSX",
  "SENSEX": "/pricefeed/notapplicable/inidicesindia/in%3BSEN",
  "NASDAQ": "/pricefeed/notapplicable/indicesglobal/us%3BCOMP",
  "DOWJONES": "/pricefeed/notapplicable/indicesglobal/US%3Bdji"
}

const ShowStat = (props) => (
  <div className="Stat-card">
    <p>{props.exchangeName}</p>
    <p>Current Price: {props.data.pricecurrent}</p>
    <p>Change : {props.data.CHANGE > 0 ? `+${props.data.CHANGE}` : `${props.data.CHANGE}`} </p>
    <p>% Change: {props.data.CHANGE > 0 ? `+${props.data.PERCCHANGE}` : `${props.data.PERCCHANGE}`}</p>
  </div>
)
class IndexCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exchangeName: props.exchangeName,
      data: null,
      isLoaded: false
    }
  }

  fetchMarketStats() {
    let exchangeUrlPath = paths[this.state.exchangeName]
    let url = `${HostUrl}${exchangeUrlPath}`
    axios.get(url).then(resp => {
      console.log(resp);
      this.setState({
        data: resp.data.data,
        isLoaded: true
      })
    }).catch(err => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.fetchMarketStats();
  }

  render() {
    const { isLoaded, exchangeName, data } = this.state;
    return (
      <div>
        {isLoaded ?
          <ShowStat data={data} exchangeName={exchangeName} />
          : <p>Loading....</p>
        }

      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Market Watch by <a href="https://twitter.com/prdpx7" target="_blank" rel="noopener noreferrer">@prdpx7</a></p>
      </header>
      <header className="App-cards">
        <IndexCard exchangeName="NIFTY" />
        <IndexCard exchangeName="SENSEX" />
        <IndexCard exchangeName="NASDAQ" />
        <IndexCard exchangeName="DOWJONES" />
      </header>
    </div >
  );
}

export default App;
