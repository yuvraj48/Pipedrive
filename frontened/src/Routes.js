import React from 'react';
import {Switch,Route} from 'react-router-dom';
import dragg from './Components/dragg';
import Header from './Components/HeaderC/Header';
import home from './Components/Home/home';
import SignIn from './Components/SignC/Signin';
import Schedule from './Components/ActivityC/Activity';
import Calender from './Components/ActivityC/ActivityCalender';
import Persons from './Components/ContactS.js/person';
import Organisations from './Components/ContactS.js/organisation';
import Products from './Components/Product/Product';
import ModalExample from './Components/DealC/Deal';
import Deallist from './Components/DealC/DealList';
import Specificdeal from './Components/DealC/Dealspecific';
import UserRoute from './Components/SignC/Userroute'
import HomeRoute from './Components/SignC/homeprivateroute';
import Mail from './Components/Mail';
import Lead from './Components/Lead/Lead';
import Insight from './Components/Inshight/Insight';



const Routes=()=>{
    return(
        <div>
            <Header/>
            <Switch>
                <HomeRoute exact path ="/" component={home}/>
               <Route exact path="/login" component={SignIn}/>
               <Route exact path="/drag" component={dragg}/>
               <UserRoute exact path="/leads" component={Lead}/>
               <UserRoute exact path="/activities" component={Schedule}/>
               <UserRoute exact path="/activities/calendar" component={Calender}/>
               <UserRoute exact path ="/organisation/list" component={Organisations}/>
               <UserRoute exact path ="/person/list" component={Persons}/>
               <UserRoute exact path ="/products" component={Products}/>
               <UserRoute exact path ="/deals/list" component={Deallist}/>
               <UserRoute exact path="/deals/:dealid/:userid" component={Specificdeal} />
               <UserRoute exact path ="/deals" component={ModalExample}/>
               <UserRoute exact path ="/mail" component={Mail}/>
               <UserRoute exact path ="/insight" component={Insight}/>
                
            </Switch>
 
        </div>
    )
}

export default Routes;