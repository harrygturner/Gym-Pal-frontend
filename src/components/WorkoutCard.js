import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        height: 'fit-content',
    },
    table: {
        minWidth: 700,
    },
});


function WorkoutCard(props) {
    const { classes } = props;

    return (
        <div id='workout-table'>
            <div className='title-cont'>
                <h2>{props.workout.title}</h2>
            </div>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell>Exercise</TableCell>
                        <TableCell align="right">Sets</TableCell>
                        <TableCell align="right">Reps</TableCell>
                        <TableCell align="right">Rest Period (seconds)</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {props.workout.workout_exercises.map(exercise => (
                        <TableRow key={exercise.id}>
                        <TableCell component="th" scope="row">
                            {exercise.name}
                        </TableCell>
                        <TableCell align="right">{exercise.sets}</TableCell>
                        <TableCell align="right">{exercise.reps}</TableCell>
                        <TableCell align="right">{exercise.rest}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

WorkoutCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkoutCard);