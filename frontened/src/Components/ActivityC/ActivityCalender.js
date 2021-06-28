import  React, { useState ,useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { getActivitys ,deleteActivity} from './Activityhelper';

import { appointments } from './demo-data';



   const Calender =()=>{
    const [activitys,setActivity]=useState([])
    const [error,setError]=useState(false)
      const [time, setTime] = useState(new Date())
      const changeTime = () => {
        setTime(new Date())
    }
    const loadallActivity=()=>{
      getActivitys().then(data=>{
          if(data&&data.error){
              setError(data.error)
          }
          else{
              setActivity(data);
              console.log(data)
          }
      });

  };

  useEffect(()=>{
    loadallActivity()
  },[])
    useEffect(() => {
        const tick = setInterval(() => {
            changeTime()
        }, 1000)
        return () => clearInterval(tick)
    })
      
     
     

    return (
      <Paper>
        <Scheduler
         data={activitys}
        
      
          height={660}
        >
          <ViewState>{time.toLocaleTimeString()}</ViewState>
          
          
          <WeekView
            startDayHour={9}
            endDayHour={19}
          />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
        </Scheduler>
      </Paper>
    );
  }

export default Calender;
