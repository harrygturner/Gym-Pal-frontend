import React from 'react';

const SignInForm = (props) => {

   return(
      <div className='signin-form'>
         <h3>Log into GymPal</h3>
         <form onSubmit={e => props.handleLogIn(e)}>
            <input type='text' name='email' placeholder='Email Address...' onChange={e => props.handleChange(e)} /><br />
            <input type='password' name='password' placeholder='Password...' onChange={e => props.handleChange(e)} /><br />
            <input type='submit' value='Log In' />
         </form>
      </div>
      )

}

export default SignInForm