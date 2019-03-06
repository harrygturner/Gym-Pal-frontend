import React, { Component } from 'react'; 
import '../MyWorkout.css'
import WorkoutCard from "../components/WorkoutCard"

import {
  Route, 
  Link
} from 'react-router-dom';



var placeholder = document.createElement("tr");
placeholder.className = "placeholder";

export default class MyWorkout extends Component {
  
  state = {
    workouts: [this.props.myWorkout],

    workoutId: null,
    selectedWorkoutExercises: [],
    title: null, 
    submittedWorkout: {
      "title": "Shoulder Boulder Bro",
      "id": 16,
      "user_id": 3,
      "workout_exercises": [
        {
          "name": "Cable Shrug",
          "sets": 5,
          "reps": 12,
          "rest": 90,
          "order": 0
        },
        {
          "name": "Military Press",
          "sets": 5,
          "reps": 5,
          "rest": 180,
          "order": 2
        },
        {
          "name": "Lateral-to-Front Raises",
          "sets": 5,
          "reps": 20,
          "rest": 45,
          "order": 1
        }
      ]
    },
    showWorkout: true
  }

  addWorkouts = (userData) => {
      const workouts = userData.workouts
      this.setState({
        workouts: workouts
      })
  }


  componentDidMount(){
    const workouts = this.state.workouts[0]
    const exercises = []
    workouts.forEach(exercise => exercises.push({name :exercise.name, sets: null, reps: null, rest: null}))
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
    this.dragged.style.display = '';
    this.dragged.parentNode.removeChild(placeholder);
    var data = this.state.selectedWorkoutExercises;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if(from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({selectedWorkoutExercises: data})
    }

  dragOver(e) {
    e.preventDefault();
    this.dragged.style.display = "block";
    if(e.target.className === 'placeholder') return;
    this.over = e.target;
    e.target.parentNode.insertBefore(placeholder, e.target);
  }

  handleSubmit = () => {
    const forms = document.querySelectorAll('form')
    const exercises = []

    for (let i = 0; i < this.state.selectedWorkoutExercises.length; i++)
    {
      exercises.push({name: forms[i].dataset.name, sets: parseInt(forms[i].elements[0].value) , reps:parseInt(forms[i].elements[1].value) , rest:parseInt(forms[i].elements[2].value), order: parseInt(forms[i].dataset.id)})
    }
    this.setState({

    selectedWorkoutExercises: exercises
  })
    fetch('http://localhost:3001/workouts', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title: this.state.title, user_id: 3})
}).then(resp => resp.json())
.then(data => this.setState({
  workoutId: data.id
})).then(this.createWorkoutExercisesInstances)
  }

  createWorkoutExercisesInstances =() => {
    const exercises = this.state.selectedWorkoutExercises

    for (let i = 0; i < this.state.selectedWorkoutExercises.length; i++)
    {
      this.exercisesFetch(exercises[i].name, exercises[i].sets, exercises[i].reps, exercises[i].rest, exercises[i].order, )
    }   
  }
  
  exercisesFetch = (name, sets, reps, rest, order) => {
  const workoutId = this.state.workoutId
  fetch('http://localhost:3001/workout_exercises', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: name, sets: sets, reps: reps, rest: rest, order: order, workout_id: workoutId})
}).then(resp => resp.json())
.then(this.getWorkoutObject)
  }

  getWorkoutObject =() => {
    const  workoutId = this.state.workoutId
    fetch(`http://localhost:3001/workouts/${workoutId}`)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        submittedWorkout: data
      })
    })
  }
  
	render() { 
    var listItems = this.state.selectedWorkoutExercises.map((item, i) => {
      return ( 
        <form  data-name={item.name} className='workoutrow'
          data-id={i}
          key={i}
          draggable='true'
          onDragEnd={this.dragEnd.bind(this)}
          onDragStart={this.dragStart.bind(this)}>
        <label>
          {item.name} <br></br>

          <input  type="number" name="sets" placeholder="Enter Sets"/>
          <input type="number" name="reps" placeholder="Enter Reps"/>
          <input type="number" name="rest" placeholder="Enter Rest Period"/>
          <button className="remove" onClick={e => this.props.removeExercise(e, item)}>Remove</button>
        </label>
      </form>
      )
    });
		return (
			<div className="WOE" onDragOver={this.dragOver.bind(this)}>
      <input onChange={event => this.setState({
        title: event.target.value
      })} className="title" type="text" name="rest" placeholder="Enter Title"/>
        {listItems}
        <Link to="/MyWorkout/workoutcard">
        <button className="submit" onClick={this.handleSubmit}>Submit Workout</button>
        </Link>
        <Route
            path="/MyWorkout/workoutcard"
            component={() => <WorkoutCard workout={this.state.submittedWorkout}/> }
          />
    
      </div>
		)
	}
}

