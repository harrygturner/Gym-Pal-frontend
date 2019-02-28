import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
                  <Typography gutterBottom variant="h5" component="h4">
                     {exercise.name}
                  </Typography>
                  <Typography component="p">
                     Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                     across all continents except Antarctica
                  </Typography>
               </CardContent>
               </CardActionArea>
               <CardActions>
                  <IconButton aria-label="Add to favorites">
                     <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="Share">
                     <ShareIcon />
                  </IconButton>
               </CardActions>
            </Card>
         </Grid>
      );
}

ExerciseCard.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExerciseCard);