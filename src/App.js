import React, { PureComponent } from 'react';
import ExerciseContainer from './containers/ExerciseContainer'
import MyWorkout from './containers/MyWorkout'
import ExerciseSpec from './components/ExerciseSpec';
import SideBar from './containers/SideBar';
import SignIn from './containers/SignIn';
import Profile from './containers/Profile'
import {
   withRouter,
   Switch,
   Route
} from 'react-router-dom';
import API from './API'

class App extends PureComponent {

state = {
   user: {
      name: '',
      id: null,
   },
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

// -------------------- Sign In/Out -------------------
signIn = user => {
   localStorage.setItem('token', user.token);
   this.setState({ user: {
      name: user.name,
      id: user.id,
   }
   });
}

signOut = () => {
   localStorage.removeItem('token');
   this.setState({ user: {
      ...this.state.user,
      name: '',
      id: null
      } 
   });
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
   this.fetchAllData();
   API.validate().then(userData => {
      if(userData.error) {
         this.signOut();
      } else {
         this.signIn(userData);
         this.props.history.push('/home')
      }
   })

   if(!this.state.user.name){
      this.props.history.push('/signin');
   }

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

removeExercise = (e, exerciseToRemove) => {
   e.preventDefault()
   const exercises = this.state.myWorkout
   const newExercises = exercises.filter(exercise => exercise.name !== exerciseToRemove.name)

   this.setState({
      myWorkout: newExercises
   })
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

renderPageContent = () => {
   const exercises = this.state.muscleClickedOn 
      ? this.state.filteredExercises
      : this.state.exercise

   if(this.state.exerciseSelected){
      return(
         <Route exact path='/exercise/:id' component={routerProps => {
            return(
               <div className="App app-spec">
                  <SideBar 
                     handleMuscleSelected={this.handleMuscleSelected} 
                     handleHomeBtnClick={this.handleReturningToHomePage} 
                     numberOfExercisesInWorkOut={this.numberOfExercisesInWorkOut}
                     signout={this.signOut}
                     user={this.state.user}
                     exerciseSelected={this.state.exerciseSelected}
                  />
                     <main className='main'>
                        <div className='main-content'>
                           <ExerciseSpec 
                              exercise={this.state.exerciseSelected} 
                              findExerciseImage={this.findExerciseImage}
                              handleGoBack={this.handleReturningToHomePage}
                              findQueryForExercise={this.findQueryForExercise}
                              handleAddToWorkout={this.handleAddToWorkout}
                              exercisesInWorkout={this.state.myWorkout}
                              user={this.state.user}
                              {...routerProps}
                           />
                        </div>
                     </main>
               </div>

            )
         }}
      />)
   } else {
      return (
         <Route exact path='/home' component={() => {
            return(
            <div className="App app-main">
               <SideBar 
                  handleMuscleSelected={this.handleMuscleSelected} 
                  handleHomeBtnClick={this.handleReturningToHomePage} 
                  numberOfExercisesInWorkOut={this.numberOfExercisesInWorkOut}
                  signout={this.signOut}
                  user={this.state.user}
               />
                  <main className='main'>
                     <div className='main-content'>
                        <ExerciseContainer 
                           exercises={exercises} 
                           handleExerciseSelected={this.handleExerciseSelected} 
                           findQueryForExercise={this.findQueryForExercise}
                        />
                     </div>
                  </main>

            </div>
            )
         }
      }
      />)
   }
}

render() {

   return (
      <Switch>
         <Route exact path='/signin' component={routerProps => (
            <SignIn signIn={this.signIn} {...routerProps} /> 
         )} /> 
         {this.renderPageContent()}
         <Route path='/myworkout' component={() => {
            return(
               <div id='myworkout' className='App app-spec'>
                  <SideBar 
                     handleMuscleSelected={this.handleMuscleSelected} 
                     handleHomeBtnClick={this.handleReturningToHomePage} 
                     numberOfExercisesInWorkOut={this.numberOfExercisesInWorkOut}
                     signout={this.signOut}
                     user={this.state.user}
                     exerciseSelected={true}
                  />
                  <MyWorkout 
                     myWorkout={this.state.myWorkout} 
                     userId={this.state.user.id} 
                     removeExercise={this.removeExercise}
                     />
               </div>
            )
            }}/>
            <div className="profile">
               <SideBar 
                  handleMuscleSelected={this.handleMuscleSelected} 
                  handleHomeBtnClick={this.handleReturningToHomePage} 
                  numberOfExercisesInWorkOut={this.numberOfExercisesInWorkOut}
                  signout={this.signOut}
                  userName={this.state.userName}
               />
              <Route exact path='/profile' component={() => <Profile user={this.state.userData}/>
           } /> 
           </div>
      </Switch>
   );
}
}

export default withRouter(App);