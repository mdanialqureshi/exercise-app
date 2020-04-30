import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


// this is a component on its own. Functional react component, not a class compoenent.
// no state no lifecyle methods
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)


export default class ExercisesList extends Component {

  constructor(props) {
    super(props); //call parent class parent, all componets with constuctor must

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {exercises: []};
  }

  componentDidMount() {
    const url = window.location.origin;
    axios.get(url + '/exercises/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    const url = window.location.origin;
    axios.delete(url + '/exercises/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
        //filter, so only reyutn certain elements. For every excercise
        // in the array does not equal the id, u pass it back to the array
        // if it does equal it then it is filtered out
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
      //for every excercise return a component
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}