import React from 'react';

const WorkoutCard = props => {
    const {workout} = props ;
    const allExercises = () => {
        return workout.workout_exercises.map(exercise => <tr><td>{exercise.name}</td><td>{exercise.sets}</td><td>{exercise.reps}</td><td>{exercise.rest}s</td></tr>)
    
    }
        return(
            <div className='workout-timetable'>
                <h1>{workout.title}</h1>
                <table className="exercises">
                    <tr>
                    <th>Exercises</th>
                    <th>Sets</th>
                    <th>Reps</th>
                    <th>Rest Period</th>
                    </tr>
                {allExercises()}
                </table>
            </div>
        )
    }
export default WorkoutCard