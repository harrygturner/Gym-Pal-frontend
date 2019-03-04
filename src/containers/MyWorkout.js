import React, { Component } from 'react'; 
import { FORMERR } from 'dns';
// import './App.css';
var placeholder = document.createElement("tr");
placeholder.className = "placeholder";


export default class MyWorkout extends Component {
  
  state = {
    workouts: [],
    selectedWorkout: 3,
    selectedWorkoutExercises: []
  }
  componentDidMount(){
  fetch(`http://localhost:3001/users/3`)
  .then(res => res.json())
  .then(data => this.addWorkouts(data)) 
  .then(this.setSelectedWorkoutExercises)
  }              
  
  addWorkouts = (userData) => {
      const workouts = userData.workouts
      this.setState({
        workouts: workouts
      })
  }

  setSelectedWorkoutExercises = () => {
    const workoutId = this.state.selectedWorkout
    const workout = this.state.workouts.filter(workout => workout.id === workoutId)
    const exercises = workout[0].workoutexercises
    // console.log(exercises)
    // const orderedExercises = exercises.sort( (a, b) => a.order - b.order )
    this.setState({
      selectedWorkoutExercises: exercises
    })
  }

  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dragged);
  }
  dragEnd(e) {
    this.dragged.style.display = 'block';
    this.dragged.parentNode.removeChild(placeholder);
    
    // update state
    var data = this.state.selectedWorkoutExercises;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if(from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({selectedWorkoutExercises: data})
    console.log(this.state.selectedWorkoutExercises)
    fetch('http://localhost:3001/workouts/3', {
      method: 'PATCH',
      body: JSON.stringify({workoutexercises: this.state.selectedWorkoutExercises}), 
      headers:{'Content-Type': 'application/json'}
      }).then(res => res.json())
    }

  dragOver(e) {
    e.preventDefault();
    this.dragged.style.display = "none";
    if(e.target.className === 'placeholder') return;
    this.over = e.target;
    e.target.parentNode.insertBefore(placeholder, e.target);
  }
	render() {
    var listItems = this.state.selectedWorkoutExercises.map((item, i) => {
      return ( 
        <tr
          data-id={i}
          key={i}
          draggable='true'
          onDragEnd={this.dragEnd.bind(this)}
          onDragStart={this.dragStart.bind(this)}>{item}</tr>
      )
     });
		return (
			<table onDragOver={this.dragOver.bind(this)}>
      <tbody>
        {listItems}
        </tbody>
      </table>
		)
	}
}
