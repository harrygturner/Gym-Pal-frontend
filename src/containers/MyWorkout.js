import React, { Component } from 'react'; 
import '../MyWorkout.css'


var placeholder = document.createElement("tr");
placeholder.className = "placeholder";

export default class MyWorkout extends Component {
  
  state = {
    workouts: [this.props.myWorkout],
    selectedWorkout: 3,
    selectedWorkoutExercises: []
  }            
  
  forms = document.querySelectorAll('form')

  addWorkouts = (userData) => {
      const workouts = userData.workouts
      this.setState({
        workouts: workouts
      })
  }


  componentDidMount(){
    const workouts = this.state.workouts[0]
    const exercises = []
    workouts.forEach(exercise => exercises.push({name :exercise.name, sets: null, reps: null, rest: null}))
  
    this.setState({
      selectedWorkoutExercises: exercises
    })

    if(!this.state.userName) {
      this.props.history.push('/signin');
    }
    
  }


  dragStart(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dragged);
  }
  dragEnd(e) {
    this.dragged.style.display = '';
    this.dragged.parentNode.removeChild(placeholder);
    
    // update state
    var data = this.state.selectedWorkoutExercises;
    var from = Number(this.dragged.dataset.id);
    var to = Number(this.over.dataset.id);
    if(from < to) to--;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({selectedWorkoutExercises: data})
    console.log(this.state.selectedWorkoutExercises)
    fetch('http://localhost:3001/workouts/3', {
      method: 'PATCH',
      body: JSON.stringify({workoutexercises: JSON.stringify(this.state.selectedWorkoutExercises)}), 
      headers:{'Content-Type': 'application/json'}
      }).then(res => res.json())
    }

  dragOver(e) {
    e.preventDefault();
    this.dragged.style.display = "block";
    if(e.target.className === 'placeholder') return;
    this.over = e.target;
    e.target.parentNode.insertBefore(placeholder, e.target);
  }

  handleSubmit = () => {
    const forms = document.querySelectorAll('form')
    const exercises = []
  
    for (let i = 0; i < this.state.selectedWorkoutExercises.length; i++)
    {
      exercises.push({name: forms[i].dataset.name, sets: parseInt(forms[i].elements[0].value) , reps:parseInt(forms[i].elements[1].value) , rest:parseInt(forms[i].elements[2].value)})
    }
    this.setState({
    selectedWorkoutExercises: exercises
  })
  
  }
  
	render() {
    var listItems = this.state.selectedWorkoutExercises.map((item, i) => {
      return ( 
        <form  data-name={item.name} onSubmit={e => console.log('hi')} className='workoutrow'
          data-id={i}
          key={i}
          draggable='true'
          onDragEnd={this.dragEnd.bind(this)}
          onDragStart={this.dragStart.bind(this)}>
        <label>
          {item.name} <br></br>
          <input  type="text" name="sets" placeholder="Enter Sets"/>
          <input type="text" name="reps" placeholder="Enter Reps"/>
          <input type="text" name="rest" placeholder="Enter Rest Period"/>
        </label>
      </form>
      )
    });
		return (
			<div onDragOver={this.dragOver.bind(this)}>
        {listItems}
        <button onClick={this.handleSubmit}>Submit Workout</button>
      </div>
      
      
		)
	}
}

// ADDING MATERIAL UI
