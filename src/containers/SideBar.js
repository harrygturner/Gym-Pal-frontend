import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import HumanBody from './HumanBody';
import { Link } from "react-router-dom";
import Badge from '@material-ui/core/Badge';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

const SideBar = (props) => {

  const { classes } = props;
  return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Train Dirty, Eat Clean 
            </Typography>
        </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
              paper: classes.drawerPaper,
          }}
        >
        <div className={classes.toolbar} />
        <List>
        <Link to='/home' style={{ textDecoration: 'none' }} onClick={props.handleHomeBtnClick}>
          <ListItem button key='home'>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
        </Link>
        <Link to='/MyWorkout' style={{ textDecoration: 'none' }}>
          <ListItem button key='myWorkout'>
            <ListItemIcon>
              <Badge badgeContent={props.numberOfExercisesInWorkOut()} color='primary'>
                <PersonIcon /> 
              </Badge>
            </ListItemIcon>
            <ListItemText primary='My Workout' />
          </ListItem>
        </Link>
        </List>
        <Divider />
          <div className='navbar-desc'>
            Click on a body part you want to train:
          </div>
          < HumanBody handleMuscleSelected={props.handleMuscleSelected} />
        </Drawer>
      </div>
  );
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBar);