import React, { Component } from 'react'

export class AddTicker extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange(e) {
        this.setState({value: e.target.value});
      }
    
      handleSubmit(e) {

        e.preventDefault();
        console.log(e.target[0].value)
        this.props.updateTicker(e.target[0].value);
        this.setState({value: ""})
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Add a stock ticker: {' '}
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
    }

export default AddTicker

