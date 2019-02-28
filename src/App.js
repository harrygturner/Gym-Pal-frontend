import React, { Component } from 'react';
import ExerciseContainer from './containers/ExerciseContainer'
import MyWorkout from './containers/MyWorkout'
import './App.css';

class App extends Component {

  state = {
    exercise: ['Exercises are loading...'],
    myWorkout: [],
    equipment: [],
    muscle: [],
    exerciseimage: [],
    exerciseSelectedId: null,
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
    this.fetchData('exercise', 580);
    this.fetchData('equipment', 10);
    this.fetchData('muscle', 15);
    this.fetchData('exerciseimage', 204);
  }

  componentDidMount() {
    this.fetchAllData()
  }

  // ----- handle click to display selected exercise -------- 
  handleExerciseSelected = (id) => {
    this.setState({
      exerciseSelectedId: id
    })
  }

  render() {
    return (
      <div className="App">
        <MyWorkout />
        <ExerciseContainer exercises={this.state.exercise} handleExerciseSelected={this.handleExerciseSelected} exerciseSelectedId={this.state.exerciseSelectedId} />
      </div>
    );
  }
}

export default App;
