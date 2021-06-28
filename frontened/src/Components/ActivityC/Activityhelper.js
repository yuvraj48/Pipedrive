import { isAutheticated } from "../SignC/Helper";
const {user,token}=  isAutheticated();

export const createSchedule=(userId,token,schedule)=>{
    return fetch(`/activity/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        
        body:JSON.stringify(schedule)

    })
    .then(response=>{
        return response.json();
    })
    .catch(err => console.log(err));

};

export const getActivitys=()=>{
    return fetch(`/activity/${user._id}`,{
        method:"GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          }
    })
    .then(response=>{
        return response.json()
    })
  
    .catch(err => console.log(err));
}

export const deleteActivity=(ScheduleId,userId,token)=>{
    return fetch(`/activity/${ScheduleId}/${userId}`,{
        method:"delete",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
}

export const updateActivity=(ScheduleId,userId,token,schedule)=>{
    return fetch(`/activity/${ScheduleId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:schedule
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}