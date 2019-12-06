import React from 'react';
import './App.css';
import {MDBContainer} from "mdbreact"
import AddTicker from "./Components/AddTicker.js"
import Tweets from "./Components/Tweets.js"
import WatchList from "./Components/WatchList"




class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userTickers: [],
        thirdPartyAPI: []
        }
    }
    checkForUpdates = () => {
      let promiseArr = []; 
        for(let i=0; i<this.state.userTickers.length; i++){
          promiseArr.push(fetch(`https://api.stocktwits.com/api/2/streams/symbol/${this.state.userTickers[i]}.json`).body)
          // promiseArr.push(i)
        }
        Promise.all(promiseArr).then((results) => {
          for(let i =0; i<results.length; i++){
            console.log(results[i])
          }
          // this.setState({
          //   thirdPartyAPI: [results]
          // })
        })
    }
    updateTickers = (temp) => {
      //Seperate mulitple stocks if multiple entered
      let tempArr = temp.split('');
      let tempArrOfStocks = [];
      let updatedTickets
      if(tempArr.includes(" ")){
        console.log("tickers has multipole tickers")
        let tempString = "";
        for(let i=0; i<tempArr.length; i++){
          // if last letter in tempArr
          if(i === tempArr.length-1){
            tempString += tempArr[i]
            if(!tempArrOfStocks.includes(tempString.toUpperCase())){
              tempArrOfStocks.push(tempString.toUpperCase());
            }
          }else if(tempArr[i] !== " "){
            // if not space add to tempString
            tempString += tempArr[i]
          }else{
            //if space 
            if(!tempArrOfStocks.includes(tempString.toUpperCase())){
              tempArrOfStocks.push(tempString.toUpperCase());
            }
            tempString = ""
          }
        }
      }else{
        console.log("ticker only has 1 to add")
        // if only 1 ticker is being added set tempArrOfStocsk to an array of temp
        tempArrOfStocks = [temp.toUpperCase()]
      }
      for(let i=0; i<tempArrOfStocks.length; i++){

      if(this.state.userTickers.includes(tempArrOfStocks[i])){
        alert(`${tempArrOfStocks[i]} is already on your watch list...`);
      }else{
        console.log("adding this to updated tickets", tempArrOfStocks[i])
      this.setState((state) => ({
        userTickers: [...state.userTickers, tempArrOfStocks[i]]
      })
      )
    }
    }
    this.checkForUpdates();
  }
  removeTicker = (targetId) => {
    console.log(targetId.target.value);
    let updatedState = this.state.userTickers.filter(item => item != targetId.target.value)
    this.setState({
      userTickers: updatedState
    })
  }

    render(){
        return (
          <div className="App">
      <MDBContainer fluid>
        <AddTicker updateTicker={this.updateTickers}  />
        {/*  conditional render if no items in watch list tell user to add items else } */}
        {this.state.userTickers.map(item => 
          <WatchList key={this.state.userTickers.indexOf(item)} tickers={item} removeTicker={this.removeTicker} />)
          }
          {this.state.thirdPartyAPI ? "Loading tweets": "Add something to your watchlist to view tweets"}
          {/* {
            this.state.thirdPartyAPI.tweets.map(tweet => 
              <Tweets props={tweet} />
              )
          } */}
      {this.state.userTickers.length>0 ? setTimeout(this.checkForUpdates, 10000) : "boo"}
      </MDBContainer>
    </div>
  );
      }
}

export default App;
