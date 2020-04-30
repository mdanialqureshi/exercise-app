import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
//import styling for the date picker
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    //binding so this refers to the right thing inside the methods
    // of this class. This for refernces to THIS class
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  //react lifecycle method,
  //react will automatically call this right before anything loads/displays
  // on the page
  componentDidMount() {
    axios.get('http://localhost:4000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
              //only get the user name
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  //Update react state properties
  onChangeUsername(e) {
      //when someone enters a user in the form textbox, e.target.value
      // you always have to use setState property to set a state
      // not like this.setState.username. 
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  //because we use a library to pick the date, its handled differently
  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
      //prevent default html submit form behaviour
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    //use axios to send a post request to the http server running on 
    // the specified url as listed
    axios.post('http://localhost:4000/exercises/add', exercise)
      .then(res => console.log(res.data));

      //after it submits take them back to the home page
    window.location = '/';
  } //end onSubmit method

  render() {
    return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                //   .map we return something for every elemt in array
                //for each user in the array its will return an option of
                // the select box
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}