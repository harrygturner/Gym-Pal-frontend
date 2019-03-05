import React, { Component } from 'react';
import SignInForm from '../components/SignInForm';
import CreateAccount from '../components/CreateAccount';

export default class SignIn extends Component {
   
   state = {
      createAccountClicked: false,
      newuser: {
         first_name: null,
         second_name: null,
         email: null,
         password: null
      },
      olduser: {
         email: null,
         password: null
      }
   }

   fullName = (first, second) => first + ' ' + second;

   componentDidMount() {
      document.querySelector('.App').style.display = 'none';
   }

   handleCreateAccountClick = () => {
      this.setState({
         createAccountClicked: !this.state.createAccountClicked,
      })
   }

   handleLogIn = (event) => {
      event.preventDefault()
      console.log('Log in')
   }

   handleCreateAccount = (event) => {
      event.preventDefault()
      const newUser = {
         name: this.fullName(this.state.newuser.first_name, this.state.newuser.second_name),
         email: this.state.newuser.email,
         password: this.state.newuser.password
      }
      console.log(newUser)
      fetch('http://localhost:3001/users', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(newUser)
      })
   }

   handleNewUserChange = (event) => {
      this.setState({
         newuser: {
            ...this.state.newuser,
            [event.target.name]: event.target.value
         }
      })
      
   }

   handleOldUserChange = (event) => {
      this.setState({
         olduser: {
            ...this.state.olduser,
            [event.target.name]: event.target.value
         }
      })
   }

   render() {
      return(
         <div id='signin'>
            <div className='create-account' onClick={this.handleCreateAccountClick}>
               {this.state.createAccountClicked ? 'Log In' : 'Create Account' }
            </div>
            {this.state.createAccountClicked ? <CreateAccount handleCreateAccount={this.handleCreateAccount} handleChange={this.handleNewUserChange} /> : <SignInForm handleLogIn={this.handleLogIn} handleChange={this.handleOldUserChange} /> }
         </div>
      )
   }
}