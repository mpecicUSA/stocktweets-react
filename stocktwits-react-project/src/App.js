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
        thirdPartyAPI: {
          
        },
        placeholder: true,
        }
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
            tempArrOfStocks.push(tempString.toUpperCase());
          }else if(tempArr[i] !== " "){
            // if not space add to tempString
            tempString += tempArr[i]
          }else{
            //if space 
            tempArrOfStocks.push(tempString.toUpperCase())
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
  }
      
    render(){
      if(this.state.placeholder){
    return (
      <div className="App">
      <MDBContainer fluid>
        <AddTicker updateTicker={this.updateTickers}  />
        {/*  conditional render if no items in watch list tell user to add items else } */}
        {this.state.userTickers.map(item => 
          <WatchList key={this.state.userTickers.indexOf(item)} tickers={item} />)
          }
          {/* {
            this.state.thirdPartyAPI.tweets.map(tweet => 
              <Tweets props={tweet} />
              )
          } */}
          <p>Lorem ipsum</p>
          <p>Random Copyright stuff here</p>
      </MDBContainer>
    </div>
  );
      }
      // If state hasnt loaded yet show loading icon
      else {
        return ( 
          <div className="App">
            <h1>Loading</h1>
          </div>
        )
      }
} 
}

export default App;
