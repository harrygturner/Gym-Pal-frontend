import React from 'react';

const ExerciseCard = (props) => {
   const exercise = props.exercise
   
   return (
      <p>{exercise.name}</p>
   );
}

export default ExerciseCard