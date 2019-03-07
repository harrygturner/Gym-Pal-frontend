import React, { Component } from 'react';
import '../Profile.css'
import Gauge from 'react-svg-gauge';


class Profile extends Component {
    
    state = {
        user: {
        name: this.props.user.name, 
        email: this.props.user.email,
        fat: this.props.user.fat,
        muscle: this.props.user.muscle,
    }
}
    changeFat = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                fat:event.target.value
            } 
        })
     }
     
     changeMuscle = (event) => {
       this.setState({
        user: {
            ...this.state.user,
            muscle:event.target.value
        }
       })
     }
     changeUserName = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                name:event.target.value
            }
        })
      }
     
      changeUserEmail = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                email:event.target.value
            }
        })
      }

      delete = (event) => {
          event.preventDefault()
        fetch(`http://localhost:3001/users/${this.props.user.id}`, {
            method: 'DELETE',
        })
    }


      update = (event) => {
          event.preventDefault()
        fetch(`http://localhost:3001/users/${this.props.user.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: this.state.user.name , email: this.state.user.email , fat:this.state.user.fat , muscle:this.state.user.muscle })
          })
      }

      render(){
        return(
            <div className='profilepage'>
                <form className="userstats">
                <h2>{this.state.user.name}</h2>
              <input onChange={event => this.changeUserName(event)}placeholder={this.state.user.name}/>
              <input onChange={event => this.changeUserEmail(event)}placeholder={this.state.user.email}/>
              <input type="number" onChange={event => this.changeFat(event)}placeholder={this.state.user.fat}/>
              <input type="number" onChange={event => this.changeMuscle(event)}placeholder={this.state.user.muscle}/>
              <p className="fatp"> Body Fat %</p>
              <p className="musclep"> Muscle % </p>
              <Gauge className="fat"  value={this.props.user.fat} display="inline"width={380} height={200} label="" />
              <Gauge className="muscle"  color="blue" value={this.props.user.muscle} width={380} height={200} label="" />
         
              <button onClick={this.update}className="update">Update Account</button>
              <button onClick={this.delete}>Delete Account</button>
              </form>
              <div className ="gauge">
              
             
              </div>
              <div className ="gauge">
              
              </div>
            </div>
        )
      }
    }
export default Profile