import React, { Component } from 'react'
import Tweet from "./Tweet"

export class Tweets extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.stock.title} - {this.props.stock.symbol} - {this.props.messages.length} tweets </h1>
                {this.props.messages.map(message => 
                <Tweet key={message.id} tweet={message} />
                )}
            </div>
        )
    }
}

export default Tweets
