import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import SignOutIcon from '@material-ui/icons/SwapHoriz';
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
      <div className={classes.root} style={{ backgroundColor: 'gainsboro' }}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
              paper: classes.drawerPaper,
          }}
        >
        <List>
        <Link to='/home' style={{ textDecoration: 'none' }} onClick={props.handleHomeBtnClick}>
          <ListItem button key='home'>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
        </Link>
        <Link to='/profile' style={{ textDecoration: 'none' }} onClick={props.handleHomeBtnClick}>
          <ListItem button key='profile'>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary='Profile' />
          </ListItem>
        </Link>
        <Link to='/myworkout' style={{ textDecoration: 'none' }}>
          <ListItem button key='myWorkout'>
            <ListItemIcon>
              <Badge badgeContent={props.numberOfExercisesInWorkOut()} color='primary'>
                <PersonIcon /> 
              </Badge>
            </ListItemIcon>
            <ListItemText primary='My Workout' />
          </ListItem>
        </Link>
          <Link to='/signin' style={{ textDecoration: 'none' }} onClick={props.signout}>
            <ListItem button key='signOut'>
              <ListItemIcon>
                  <SignOutIcon /> 
              </ListItemIcon>
              <ListItemText primary='Sign Out' />
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