import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBuilding, faSlidersH, faUser} from '@fortawesome/free-solid-svg-icons'
import { Link, useHistory } from 'react-router-dom';

function Organisationsidebar(){
  let history =useHistory();
const [sidebar,setSidebar]=useState(false);

const showSidebar =()=>setSidebar(!sidebar);


const currentTab = (history, path) => {
  if (history.location.pathname == path) {  
    return {   color:"#2565AE"};
  } else {
    return { color: "#424242" };
  }
};

return(
    <div style={{ color: 'grey' }} className="mt-auto mb-auto">
   
   <div style={{display:"flex"}} className="mt-auto mb-auto ">
      <div>
     <h6 className='pl-2 pr-2 mb-0'><FontAwesomeIcon icon={faSlidersH} onClick={showSidebar}/></h6>
      </div>
      <h6 className="">Contacts</h6><h6 className="pl-1 pr-1">/</h6><h6 className="" style={{color:'black'}}>Organisation</h6>

    </div>
    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
      <ul className='nav-menu-items' >
        <li className='navbar-toggle'>
          <Link to='#' className='menu-bars'>
            
          </Link>
        </li>
       <li className=" p-1 "><FontAwesomeIcon className="mr-2 ml-3 " style={{fontSize:"18px"}} icon={faUser}/><Link to="/person/list" style={currentTab(history,"person/list")} style={{fontSize:"16px"}} className="text-secondary">People</Link></li>
       <li className='mt-2 p-1 ml-1 mr-1 rounded' style={{backgroundColor:"lightblue"}}><FontAwesomeIcon className="mr-2 ml-3 text-primary" style={{fontSize:"18px"}} icon={faBuilding}/><Link to="/organisation/list" style={currentTab(history,"/organisation/list")} className="text-primary" style={{fontSize:"16px"}}>Organisation</Link></li>
      </ul>
    </nav>
  </div>
)
    }

export default Organisationsidebar;