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


    update = () => {

    }
    render(){
        return(
            <div className='profilepage'>
                <form className="userstats">
                <h2>Your Account</h2>
                <input onChange={event => this.changeUserName(event)}placeholder={this.state.user.name}/>
                <input onChange={event => this.changeUserEmail(event)}placeholder={this.state.user.email}/>
                <input type="number" onChange={event => this.changeFat(event)}placeholder={this.state.user.fat}/>
                <input type="number" onChange={event => this.changeMuscle(event)}placeholder={this.state.user.muscle}/>
                <div className='gauges'>
                    <div className='fat'>
                        <Gauge className="fat"  value={this.props.userFat} display="inline"width={380} height={200} label="" />
                        <p className="fatp"> Body Fat %</p>
                    </div>
                    <div className='muscle'>
                        <Gauge className="muscle"  color="blue" value={this.props.userMuscle} width={380} height={200} label="" />
                        <p className="musclep"> Muscle % </p>
                    </div>
                </div>
                <div className='btn-cont'>
                    <button onClick={this.update}className="update">Update Account</button><br />
                    <button onClick={this.delete}>Delete Account</button>
                </div>
                </form>
            </div>
        )
    }
    }
export default Profile