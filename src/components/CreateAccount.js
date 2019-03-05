import React from 'react';

const CreateAccount = (props) => {

   return(
      <div className='create-form'>
         <h3>Create your GymPal Account</h3>
         <form onSubmit={e => props.handleCreateAccount(e)}>
            <input type='text' name='first_name' placeholder='First Name...' onChange={e => props.handleChange(e)} /><br />
            <input type='text' name='second_name' placeholder='Second Name...' onChange={e => props.handleChange(e)} /><br />
            <input type='text' name='email' placeholder='Email Address...' onChange={e => props.handleChange(e)} /><br />
            <input type='password' name='password' placeholder='Password...'  onChange={e => props.handleChange(e)} /><br />
            <input type='submit' value='Create Account' />
         </form>
      </div>
   )
}

export default CreateAccount