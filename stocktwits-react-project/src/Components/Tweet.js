import React, { Component } from 'react'

export class Tweet extends Component {
    render() {
        let {username, name, official} = this.props.tweet.user
        return (
            <div>
                <p>

                {username} -- {name}
                {official}
                {this.props.tweet.body}
                </p>
            </div>
        )
    }
}

export default Tweet
