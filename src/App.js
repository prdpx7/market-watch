import React from 'react';

import axios from 'axios';

import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';

import "./App.css";
import { darkMode, lightMode } from './theme';

import Toggle from 'react-toggle';
import "react-toggle/style.css"


const HostUrl = "https://priceapi.moneycontrol.com"
const paths = {
  "NIFTY": "/pricefeed/notapplicable/inidicesindia/in%3BNSX",
  "SENSEX": "/pricefeed/notapplicable/inidicesindia/in%3BSEN",
  "NASDAQ": "/pricefeed/notapplicable/indicesglobal/us%3BCOMP",
  "DOWJONES": "/pricefeed/notapplicable/indicesglobal/US%3Bdji"
}

const StyledStatCard = styled.div`
  margin: 3rem;
`
const StyledCurrentIndex = styled.span`
  color: ${props => props.theme.primary},
  font-weight: '500'
`
const StyledIndexChange = styled.span`
  color: ${props => (props.isIncreasing ? props.theme.green : props.theme.red)};
`
const StyledIndexName = styled.div`
  color: ${props => props.theme.primary},
  font-weight: 500;
  font-size: 1.5rem;
`
const formatNumber = (number) => {
  return new Intl.NumberFormat('en-In').format(number)
}
const ShowStat = (props) => (
  <StyledStatCard >
    <StyledIndexName>{props.data.company}</StyledIndexName>
    <div>
      <StyledCurrentIndex >{formatNumber(props.data.pricecurrent)}</StyledCurrentIndex>
      <StyledIndexChange isIncreasing={props.data.CHANGE > 0}>{props.data.CHANGE > 0 ? '▲' : '▼'}  {formatNumber(props.data.CHANGE)} ({props.data.PERCCHANGE}%)</StyledIndexChange>
    </div>
  </StyledStatCard >
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


const StyledContainer = styled.div`
  text-align: center;
  background-color: ${props => props.theme.bg};
`
const StyledToggle = styled(Toggle)`
  .react-toggle--checked .react-toggle-track {
    background-color: blue;
  }
  margin-left: auto;
`;
const AppHeader = styled.header`
  background-color: ${props => props.theme.bg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
`
const AppFooter = styled.footer`
  color: ${props => props.theme.primary};
  font-weight: 600;
  font-size: 1.3rem;
  padding-bottom: 2rem;
`
const StyledTwitterLink = styled.a`
  font-weight: 500;
  color: ${props => props.theme.linkColor};
  text-decoration: unset;
`
const StyledAppTitle = styled.h1`
  font-weight: 600;
  font-size: 2rem;
  color: ${props => props.theme.primary};
  margin-left: auto;
`
const StyledAppCardContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-flow: wrap;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: ${props => props.theme.primary};
`
class App extends React.Component {
  constructor(props) {
    super(props)
    let themeFromLocalStorage = localStorage.getItem("theme");
    // default theme is light
    let theme = themeFromLocalStorage == "dark" ? darkMode : lightMode
    this.state = {
      theme: theme,
      themeName: "light",
      toggleChecked: theme === lightMode ? false : true
    }
    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme() {
    let theme = !this.state.toggleChecked ? darkMode : lightMode
    let themeName = theme === lightMode ? "light" : "dark"
    localStorage.setItem("theme", themeName)
    this.setState({
      toggleChecked: !this.state.toggleChecked,
      theme: !this.state.toggleChecked ? darkMode : lightMode,
      themeName: themeName
    })

  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <StyledContainer>
          <AppHeader>
            <StyledAppTitle>Market Watch</StyledAppTitle>
            <StyledToggle defaultChecked={this.state.toggleChecked} icons={{
              checked: null, unchecked: null
            }} checked={this.state.toggleChecked} onChange={this.changeTheme} />
          </AppHeader>
          <StyledAppCardContainer>
            <IndexCard exchangeName="NIFTY" />
            <IndexCard exchangeName="SENSEX" />
            <IndexCard exchangeName="NASDAQ" />
            <IndexCard exchangeName="DOWJONES" />
          </StyledAppCardContainer>
          <AppFooter>Made by <StyledTwitterLink href="https://twitter.com/prdpx7/" target="_blank" rel="noopener">@prdpx7</StyledTwitterLink></AppFooter>
        </StyledContainer>
      </ThemeProvider>
    );
  }

}

export default App;
