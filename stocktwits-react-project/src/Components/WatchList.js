import React, { Component } from 'react'

export class WatchList extends Component {
    render() {
        return (
            <div>
                <p>{this.props.tickers} - </p> <p>15</p>
                <button>X</button>
            </div>
        )
    }
}

export default WatchList
