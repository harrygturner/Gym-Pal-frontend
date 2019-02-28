import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import ExerciseCard from '../components/ExerciseCard'


const styles = theme => ({
   root: {
      flexGrow: 1,
   },
   paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
   },
});


const ExerciseContainer = (props) => {
   const { classes } = props;
   const renderExercise = props.exercises.map(exercise => {
      return typeof(exercise) === 'string' ? exercise : <ExerciseCard exercise={exercise} key={exercise.id} handleExerciseSelected={props.handleExerciseSelected}/>
   })

   return (
      <div className={classes.root}>
         <Grid container spacing={16}>
            {renderExercise}
         </Grid>
      </div>
   );
   
}

ExerciseContainer.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExerciseContainer)


