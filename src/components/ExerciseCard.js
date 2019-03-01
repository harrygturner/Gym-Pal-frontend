import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import muscleLogo from '../images/muscle_icon2.png';
import dumbbellLogo from '../images/dumbbell_icon.png';

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
      return (
         <Grid item xs={3}>
            <Paper className={classes.paper}></Paper>
            <Card className={classes.card}>
               <CardActionArea onClick={() => props.handleExerciseSelected(exercise.id)}>
               <CardContent>
                  <Typography gutterBottom variant="h6" component="h6">
                     {exercise.name}
                  </Typography>
               </CardContent>
               <div className='icon'>
                  <img src={muscleLogo} alt='muscle icon' style={{ width: '8%', marginRight: '10px' }} />
               </div>  
               <div className='icon'>
                  <img src={dumbbellLogo} alt='dumbbell icon' style={{ width: '8%', marginRight: '10px' }} />
               </div>
               </CardActionArea>
            </Card>
         </Grid>
      );
}

ExerciseCard.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExerciseCard);