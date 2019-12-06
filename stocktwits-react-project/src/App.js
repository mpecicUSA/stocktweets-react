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
        console.log("checking for updates running")
        this.setState({
          thirdPartyAPI: []
        })
        for(let i=0; i<this.state.userTickers.length; i++){
          let link = `https://api.stocktwits.com/api/2/streams/symbol/${this.state.userTickers[i]}.json`;
          console.log(link)
          fetch(link)
            .then((res) => {
              return res.json()
            })
            .then((data) => {
                console.log(data);
                this.setState({
                  thirdPartyAPI: [...this.state.thirdPartyAPI, data]
                })
              })
            .catch(err => {
              console.log(err, link)
            });
        }
        // this.setState(()=> ({
        //   thirdPartyAPI: updated
        // }))
  }
    updateTickers = (temp) => {
      //Seperate mulitple stocks if multiple entered
      let tempArr = temp.split('');
      let tempArrOfStocks = [];
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
    setTimeout(()=>this.checkForUpdates(), 2000);
  }
  removeTicker = (targetId) => {
    console.log(targetId.target.value);
    let updatedState = this.state.userTickers.filter(item => item != targetId.target.value)
    this.setState({
      userTickers: updatedState
    })
    setTimeout(()=> this.checkForUpdates(), 1000)
  }

    render(){
        return (
          <div className="App">
      <MDBContainer fluid>
        <AddTicker updateTicker={this.updateTickers}  />
        {/*  conditional render if no items in watch list tell user to add items else } */}
        <p> {this.state.userTickers.length === 0 ? ["Your watchlist is empty... add something ^"] : "" } </p>

            {this.state.userTickers.map(item => 
              <WatchList key={this.state.userTickers.indexOf(item)} tickers={item} removeTicker={this.removeTicker} />)
            }
          {this.state.thirdPartyAPI.length >0 ? this.state.thirdPartyAPI.map(stock =>

            <Tweets key={stock.symbol.id} stock={stock.symbol} messages={stock.messages} />

          ) : "no data "}

      {this.state.userTickers.length>0 ? setTimeout(() => this.checkForUpdates(), 90000) : " "}
      </MDBContainer>
    </div>
  );
      }
}

export default App;
