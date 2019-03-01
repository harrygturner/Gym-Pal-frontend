import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import muscleLogo from '../images/muscles.svg';
import dumbbellLogo from '../images/dumbbell.svg';


const styles = {
   card: {
      maxWidth: 345,
   },
   media: {
      height: 140,
   },
};

const ExerciseCard = (props) => {
   const exercise = props.exercise;
   const { classes } = props;
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

   return (
      <Grid item xs={3}>
         <Paper className={classes.paper}></Paper>
         <Card className={classes.card}>
            <CardActionArea onClick={() => props.handleExerciseSelected(exercise.id)}>
            <CardContent>
               <Typography gutterBottom variant="h6" component="h6">
                  {exercise.name}
               </Typography>
               <Typography color="textSecondary" variant='caption'>
                  <div className='icon-row'>
                     <div className='icon'>
                        <img src={muscleLogo} style={{ width: '12%', marginRight: '10px' }} alt='muscles' />
                        {typeof(muscleArray[0]) === 'string' ? null : muscleArray[0].name}
                     </div>  
                     <div className='icon'>
                        <img src={dumbbellLogo} alt='dumbbell icon' style={{ width: '14%', marginRight: '10px' }} />
                        {typeof(equipmentArray[0]) === 'string' ? null : equipmentArray[0].name}
                     </div>
                  </div>
               </Typography>
               </CardContent>
            </CardActionArea>
         </Card>
      </Grid>
   );
}

ExerciseCard.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExerciseCard);