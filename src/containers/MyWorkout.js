import React, { Component } from 'react'; 
import '../MyWorkout.css'
import WorkoutCard from "../components/WorkoutCard"
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ErrorMessage from "../components/ErrorMessage";
import API from '../API';

var placeholder = document.createElement("tr");
placeholder.className = "placeholder";

export default class MyWorkout extends Component {
  
  state = {
    workouts: [this.props.myWorkout],

    workoutId: null,
    selectedWorkoutExercises: [],
    title: null, 
    submittedWorkout: null,
    showWorkout: false,
    formError: ''
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
    
    if(this.state.title) {
      for (let i = 0; i < this.state.selectedWorkoutExercises.length; i++){
        exercises.push({
          name: forms[i].dataset.name,
          sets: parseInt(forms[i].elements[0].value),
          reps: parseInt(forms[i].elements[1].value),
          rest: parseInt(forms[i].elements[2].value),
          order: parseInt(forms[i].dataset.id),
        })
      }
      
      // see if any form inputs are left blank if not then send to server
      let exerciseValues = Object.values(exercises[0])
      if(exercises.length > 1){
        for (let i = 1; i < exercises.length; i++) {
          exerciseValues = exerciseValues.concat(Object.values(exercises[i]))
        }
      }

      if (exerciseValues.includes(NaN)) {
          this.handleFormError('Workout form not complete.');
        } else {
          API.validate().then(userData => {
            if(userData.error) {
              this.signOut();
            } else {
              this.setState({
                selectedWorkoutExercises: exercises
              })
              
              return fetch('http://localhost:3001/workouts', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title: this.state.title, user_id: this.props.userId})
              })
                .then(resp => resp.json())
                .then(data => {
                    this.setState({
                      workoutId: data.id
                    })
                })
                .then(this.createWorkoutExercisesInstances)
            }
          })
        }
      } else {
      this.handleFormError('Workout must have a name.')
    }
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
  return fetch('http://localhost:3001/workout_exercises', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: name, sets: sets, reps: reps, rest: rest, order: order, workout_id: workoutId})
    })
      .then(resp => resp.json())
      .then(this.getWorkoutObject)
  }

  getWorkoutObject = () => {
    const  workoutId = this.state.workoutId
    return fetch(`http://localhost:3001/workouts/${workoutId}`)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          submittedWorkout: data,
          showWorkout: true,
        })
      })
  }

  handleFormError = (message) => this.setState({ formError: message })

  renderFormItems = () => this.state.selectedWorkoutExercises.map((item, i) => {
      return ( 
        <form  data-name={item.name} className='workoutrow'
          data-id={i}
          key={i}
          draggable='true'
          onDragEnd={this.dragEnd.bind(this)}
          onDragStart={this.dragStart.bind(this)}
          style={{ width:'950px'}}
          >
        <label>
        {item.name} <br></br>
        <div className='form-inputs'>
        <input  type="number" name="sets" placeholder="Enter Sets"/>
            <input type="number" name="reps" placeholder="Enter Reps"/>
            <input type="number" name="rest" placeholder="Enter Rest Period"/>
            <button className="remove" onClick={e => this.props.removeExercise(e, item)} style={{ marginLeft:'20px'}}>
              <DeleteOutlinedIcon style={{ fontSize: 'medium' }} / >
            </button>
            </div>
          </label>
        </form>
      )
    });

  renderForm = () => {
    return (
      <div className="WOE" onDragOver={this.dragOver.bind(this)}>
        <input onChange={event => this.setState({
              title: event.target.value
            })
          } 
          className="title" type="text" name="rest" placeholder="Enter Workout Name..."
        />
        {this.renderFormItems()}
        <button className="submit" onClick={this.handleSubmit}>Submit Workout</button>
        <div className='form-error'> 
          { this.state.formError ? <ErrorMessage errorMessage={this.state.formError} /> : null }
        </div>
      </div>
    )
  }
  
	render() { 
    return(
      <div className='workout-cont'>
        {this.state.showWorkout ? <WorkoutCard workout={this.state.submittedWorkout} /> : this.renderForm() }   
      </div>
    )
  }
}
  
