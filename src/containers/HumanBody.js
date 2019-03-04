import React, { Component } from 'react';
import humanFront from '../images/human_body_front.png';
import humanBack from '../images/human_body_back.png';

export default class HumanBody extends Component {
   render() {
      return (
         <div onClick={(e) => this.props.handleMuscleSelected(e)}>
            <img src={humanFront} className='human-body' alt='human-anatomy' /><br />
            <img src={humanBack} className='human-body' alt='human-anatomy' />
         </div>
      )
   }
}