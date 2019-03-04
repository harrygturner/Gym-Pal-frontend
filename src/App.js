import React, { Component } from 'react';
import ExerciseContainer from './containers/ExerciseContainer'
import MyWorkout from './containers/MyWorkout'
import './App.css';
import ExerciseSpec from './components/ExerciseSpec';

class App extends Component {

  state = {
    exercise: ['Exercises are loading...'],
    myWorkout: [],
    equipment: [],
    muscle: [],
    exerciseimage: [],
    exerciseSelected: null,
    workoutExercises: ['Curls', 'Squats', 'Crunches', 'Lunges']
  }

  // ----------------- fetch all data ----------------
  fetchData = (type, limit) => {
    fetch(`https://wger.de/api/v2/${type}/?limit=${limit}`)
      .then(resp => resp.json())
      .then(data => {
        if(type === 'exercise'){
          const validExercises = data.results.filter(exercise => exercise.name !== '' && exercise.language === 2)
          this.setState({
            [type]: validExercises
          })
        } else {
          this.setState({
            [type]: data.results
          })
        }
    })
  }

  fetchAllData = () => {
    this.fetchData('exercise', 10);
    this.fetchData('equipment', 10);
    this.fetchData('muscle', 15);
    this.fetchData('exerciseimage', 204);
  }

  componentDidMount() {
    this.fetchAllData()
  }

  // ----- handle click to display selected exercise -------- 
  handleExerciseSelected = (id) => {
    const exercise = this.state.exercise.find(exercise => exercise.id === id)
    this.setState({
      exerciseSelected: exercise
    })
  }

  handleAddToWorkout = () => {
    const exercise = this.state.exerciseSelected
    if(!this.state.myWorkout.includes(exercise)) {
      this.setState({
        myWorkout: [...this.state.myWorkout, exercise],
        exerciseSelected: null
      })
    }
  }

  // find query (muscle/equipment) for that speific exercise
  findQueryForExercise = (query, id) => {
    return this.state[query].find(data => data.id === id)
  }

  // find exercise image 
  findExerciseImage = (exerciseId) => {
    return this.state.exerciseimage.find(image => image.exercise === exerciseId)
  }

  // ------------handle exercise spec buttons ------------------
  // handle go back
  handleGoBack = () => {
    this.setState({
      exerciseSelected: null
    })
  }

  render() {
    return (
      <div className="App">
        <MyWorkout workoutExercises={this.state.workoutExercises} />

        { this.state.exerciseSelected
          ? <ExerciseSpec 
              exercise={this.state.exerciseSelected} 
              findExerciseImage={this.findExerciseImage}
              handleGoBack={this.handleGoBack}
              findQueryForExercise={this.findQueryForExercise}
              handleAddToWorkout={this.handleAddToWorkout}
            /> 
          : <ExerciseContainer 
              exercises={this.state.exercise} 
              handleExerciseSelected={this.handleExerciseSelected} 
              findQueryForExercise={this.findQueryForExercise}
            />
        }
      </div>
    );
  }
}

export default App;
