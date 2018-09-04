import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { index } = this.state;
    await axios.post('/api/values', {index});
    this.setState({index: ''});
  };

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({values: values.data})
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({seenIndexes: seenIndexes.data});
  }

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number} ) => number).join(', ');
  }

  renderValues() {
    const { values } = this.state;
    
    return Object.keys(values).map((key) => (
      <div key={key}>
        For index {key} I've calculated {values[key]}
      </div>
    ));
  }

  componentDidMount () {
    this.fetchValues();
    this.fetchIndexes(); 
  }
  
  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="index">Enter your index:</label>
          <input
            type="text"
            name="index"
            value={this.state.index}
            onChange={event => this.setState({index: event.target.value})}
          />
          <button>Submit</button>
        </form>

        <h3>Indexes I have seen: </h3>
        {this.renderSeenIndexes()}

        <h3>Calculated values: </h3>
        {this.renderValues()}
      </div>
    )
  }
}

export default Fib;