import React, { Component } from 'react';
import ExerciseCard from '../components/ExerciseCard'

export default class ExerciseContainer extends Component {

   render() {
      const renderExercise = this.props.exercises.map(exercise => {
         return typeof(exercise) === 'string' ? exercise : <ExerciseCard exercise={exercise} key={exercise.id} />
      })
      return (
         <div className="exercise-cont">
            {renderExercise}
         </div>
      );
   }
}


