import React, { Component } from 'react'

export class Tweets extends Component {
    render() {
        let {tickerName, price, tweet, tweeter} = this.props;
        return (
            <div>
                <h1>Ticker Name {tickerName} </h1>
                <h3>Price {price} </h3>
                <p>Recent Tweet{tweet} </p>
                <p>Person who tweeted // time stamp {tweeter} </p>
            </div>
        )
    }
}

export default Tweets
