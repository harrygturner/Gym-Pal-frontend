import React, { Component } from 'react';
import SignInForm from '../components/SignInForm';
import CreateAccount from '../components/CreateAccount';
import ErrorMessage from '../components/ErrorMessage';
import API from '../API';

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
      },
      errorMessage: ''
   }

   fullName = (first, second) => first + ' ' + second;

   handleCreateAccountClick = () => {
      this.setState({
         createAccountClicked: !this.state.createAccountClicked,
         errorMessage: '',
      })
   }

   handleLogIn = (event) => {
      event.preventDefault()
      const { signIn, history } = this.props;
      const oldUser = this.state.olduser
      API.signin(oldUser)
         .then(data => {
            if(data.error) {
               this.handleError(data.error);
            } else {
               signIn(data);
               history.push('/home')
            }
         })
   }

   handleCreateAccount = (event) => {
      event.preventDefault()
      const { signIn, history } = this.props;
      const newUser = {
         name: this.fullName(this.state.newuser.first_name, this.state.newuser.second_name),
         email: this.state.newuser.email,
         password: this.state.newuser.password
      }
      console.log(newUser)
      API.create(newUser)
         .then( data => {
            if(data.error) {
               this.handleError(data.error);
            } else {
               signIn(data);
               history.push('/home');
            }
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

   handleError = (message) => {
      document.querySelector('#signin form').reset();
      this.setState({ errorMessage: message })
   }

   render() {
      return(
         <div id='signin'>
            <div className='create-account' onClick={this.handleCreateAccountClick}>
               {this.state.createAccountClicked ? 'Log In' : 'Create Account' }
            </div>
            {this.state.createAccountClicked ? <CreateAccount handleCreateAccount={this.handleCreateAccount} handleChange={this.handleNewUserChange} /> : <SignInForm handleLogIn={this.handleLogIn} handleChange={this.handleOldUserChange} /> }
            <div className='error-message'>
               {this.state.errorMessage ? <ErrorMessage errorMessage={this.state.errorMessage} /> : null }
            </div>
         </div>
      )
   }
}