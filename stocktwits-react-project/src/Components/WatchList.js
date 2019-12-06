import React, { Component } from 'react'

export class WatchList extends Component {
    render() {
        return (
            <div>
                <p>{this.props.tickers} </p>
                <button onClick={this.props.removeTicker} value={this.props.tickers}>X</button>
            </div>
        )
    }
}

export default WatchList
