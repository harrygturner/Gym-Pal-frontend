import React, { Component } from 'react';
import ExerciseContainer from './containers/ExerciseContainer'
import MyWorkout from './containers/MyWorkout'
import ExerciseSpec from './components/ExerciseSpec';
import SideBar from './containers/SideBar';
// import {
//    BrowserRouter as Router,
//    Route
// } from 'react-router-dom';


class App extends Component {

state = {
   exercise: ['Exercises are loading...'],
   workoutEditor: false, 
   myWorkout: [],
   equipment: [],
   exercisecategory: [],
   exerciseimage: [],
   exerciseSelected: null,
   muscleClickedOn: null,
   filteredExercises: [],
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
   this.fetchData('exercisecategory', 7);
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

// number of exercises in the my workout state
numberOfExercisesInWorkOut = () => this.state.myWorkout.length  

// ------------- handle muscle selected -------------

handleMuscleSelected = (event) => {
   const x = event.clientX;
   const y = event.clientY;
   let muscleSelected
   // ----------- front image ---------------
   // shoulder 
   if((y <= 309 && y >= 275) && ((x >= 62 && x <= 94) || (x>=140 && x<= 178))) {
      muscleSelected = 'Shoulders';
   } 
   // arms
   else if ((y >= 309 && y <= 394) && ((x >= 62 && x <= 94) || (x >= 140 && x <= 178))) {
      muscleSelected = 'Arms';
   }
   // chest 
   else if((y >= 289 && y <= 317) && ((x >= 94 && x <= 140))) {
      muscleSelected = 'Chest'
   }
   // abs 
   else if ((y >= 317 && y <= 372) && ((x >= 94 && x <= 140))) {
      muscleSelected = 'Abs'
   }
   // legs
   else if ((y >= 372 && y <= 511) && ((x >= 94 && x <= 140))) {
      muscleSelected = 'Legs'
   }
   // ----------- back image ---------------
   // back
   else if ((y >= 563 && y <= 639) && ((x >= 96 && x <= 145))) {
      muscleSelected = 'Back'
   }
   // claves 
   else if ((y >= 715 && y <= 792) && ((x >= 94 && x <= 140))) {
      muscleSelected = 'Calves'
   }
   // arms
   else if ((y >= 573 && y <= 671) && ((x >= 61 && x <= 96) || (x >= 145 && x <= 176))) {
      muscleSelected = 'Arms'
   }
   // legs
   else if ((y >= 639 && y <= 715) && ((x >= 96 && x <= 145))) {
      muscleSelected = 'Legs'
   } else {
      muscleSelected = null
   }
   if(muscleSelected){
      const exerciseCategorySelected = this.state.exercisecategory.find(ec => ec.name === muscleSelected)
      const filteredExercises = this.state.exercise.filter(exercise => exercise.category === exerciseCategorySelected.id)
      this.setState({
         muscleClickedOn: muscleSelected,
         filteredExercises: filteredExercises
      })
   } else {
      this.setState({
         muscleClickedOn: null,
         filteredExercises: []
      })
   }
}

// ----------- Client Side Router -------------------

handleReturningToHomePage = () => {
   this.setState({
      exerciseSelected: null
   })
} 

render() {
   const exercises = this.state.muscleClickedOn 
      ? this.state.filteredExercises
      : this.state.exercise

   return (
      <Router>
         <div className="App">
         <SideBar 
            handleMuscleSelected={this.handleMuscleSelected} 
            handleHomeBtnClick={this.handleReturningToHomePage} 
            numberOfExercisesInWorkOut={this.numberOfExercisesInWorkOut}
         />
         <main style={{margin: '0px auto'}}>
            <div className='main-content'>
               { this.state.exerciseSelected
                  ?  <Route exact path='/exercise/:id'
                        component={() => <ExerciseSpec 
                           exercise={this.state.exerciseSelected} 
                           findExerciseImage={this.findExerciseImage}
                           handleGoBack={this.handleReturningToHomePage}
                           findQueryForExercise={this.findQueryForExercise}
                           handleAddToWorkout={this.handleAddToWorkout}
                           exercisesInWorkout={this.state.myWorkout}
                        />
                        }
                     />
                  :  <Route exact path='/home'
                        component={()=> <ExerciseContainer 
                           exercises={exercises} 
                           handleExerciseSelected={this.handleExerciseSelected} 
                           findQueryForExercise={this.findQueryForExercise}
                        />
                        }
                     />        
               }
               <Route exact path='/MyWorkout/:id' component={() => <MyWorkout/>} />
            </div>
         </main>
         </div>
      </Router>
   );
}
}

export default App;