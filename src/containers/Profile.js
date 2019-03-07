import React from 'react';
import '../Profile.css'
import Gauge from 'react-svg-gauge';

const Profile = props => {
    const {user} = props ;
    
 

      
        return(
            <div>
                <form className="userstats">
                <h1>User Profile</h1>
              <input placeholder={user.name}/>
              <input placeholder={user.email}/>
              <input placeholder="Bodyfat %"/>
              <input placeholder="Weight %"/>
              <br></br>
              <Gauge className="fat"  value='30' display="inline"width={380} height={250} label="BodyFat(%)" />
              <Gauge className="muscle"  color="blue" value='12' width={380} height={250} label="Muscle(%)" />
              <button className="update">Update Account</button>
              <button>Delete Account</button>
              </form>
              <div className ="gauge">
              
             
              </div>
              <div className ="gauge">
              
              </div>
            </div>
        )
    }
export default Profile