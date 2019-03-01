import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';

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
   console.log(exerciseImage)

   const renderImage = () => (
      <ButtonBase className={classes.image}>
         <img className={classes.img} alt="complex" src={exerciseImage.image} />
      </ButtonBase>
   );

   return (
      <div className={classes.root}>
         <Paper className={classes.paper}>
         <Grid container spacing={16}>
            <Grid item xs={12} sm container>
               <Grid item xs container direction="column" spacing={16}>
               <Grid item xs>
                  <Typography gutterBottom variant="subtitle1">
                     {exercise.name}
                  </Typography>
                  <Typography color="textSecondary">{exercise.description.replace(/(<([^>]+)>)/ig, "")}</Typography>
               </Grid>
               <Grid item>
                  { exerciseImage 
                     ? renderImage()
                     : null
                  }
               </Grid>
               <Grid item>
                  <Button variant="outlined" className={classes.button}>
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