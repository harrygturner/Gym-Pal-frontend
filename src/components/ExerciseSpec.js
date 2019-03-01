import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import muscleLogo from '../images/muscle_icon2.png';
import dumbbellLogo from '../images/dumbbell_icon.png';

const styles = theme => ({
   root: {
      flexGrow: 1,
   },
   paper: {
      padding: theme.spacing.unit * 2,
      margin: 'auto',
      maxWidth: 800,
   },
   image: {
      width: 128,
      height: 128,
   },
   img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
   },
   button: {
      margin: theme.spacing.unit,
   },
   input: {
      display: 'none',
   },
});

function ExerciseSpec(props) {
   const exercise = props.exercise
   const { classes } = props;
   const exerciseImage = props.findExerciseImage(exercise.id)

   const renderImage = () => (
      <ButtonBase className={classes.image}>
         <img className={classes.img} alt="complex" src={exerciseImage.image} />
      </ButtonBase>
   );

   // get muscle array
   let muscleArray
   if(exercise.muscles.length !== 0) {
      muscleArray = exercise.muscles.map((muscleId) => props.findQueryForExercise('muscle', muscleId))
   } else {
      muscleArray = ['No data found.']
   }

   // get equipment array
   let equipmentArray
   if (exercise.equipment.length !== 0) {
      equipmentArray = exercise.equipment.map((equipmentId) => props.findQueryForExercise('equipment', equipmentId))
   } else {
      equipmentArray = ['No data found']
   }

   const renderList = (array) => array.map(el => el.name).join(', ')
   

   return (
      <div className={classes.root}>
         <Paper className={classes.paper}>
         <Grid container spacing={16}>
            <Grid item xs={12} sm container>
               <Grid item xs container direction="column" spacing={16}>
               <Grid item xs>
                  <Typography gutterBottom variant="h4">
                     {exercise.name}
                  </Typography>
                  <Typography color="textSecondary" variant='body2'>{exercise.description.replace(/(<([^>]+)>)/ig, "")}</Typography>
               </Grid>
               <Grid item xs>
                  <Typography color="textSecondary" variant='body1'>
                     {typeof(muscleArray[0]) === 'string' ? null : <img src={muscleLogo} alt='muscle icon' style={{ width: '3%', marginRight: '10px' }} />}
                     {typeof(muscleArray[0]) === 'string' ? null : renderList(muscleArray)}
                  </Typography>
               </Grid>
               <Grid item xs>
                  <Typography color="textSecondary" variant='body1'>
                     {typeof(equipmentArray[0]) === 'string' ? null: <img src={dumbbellLogo} alt='dumbbell icon' style={{ width: '3%', marginRight: '10px' }} /> }
                     {typeof(equipmentArray[0]) === 'string' ? null : renderList(equipmentArray)}
                  </Typography>
               </Grid>
               <Grid item>
                  { exerciseImage 
                     ? renderImage()
                     : null
                  }
               </Grid>
               <Grid item>
                  <Button variant="outlined" className={classes.button} onClick={props.handleAddToWorkout}>
                     Add to Workout
                  </Button>
                  <Button variant="outlined" className={classes.button} onClick={props.handleGoBack}>
                     Go Back
                  </Button>
               </Grid>
               </Grid>
            </Grid>
         </Grid>
         </Paper>
      </div>
   );
}

ExerciseSpec.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExerciseSpec);