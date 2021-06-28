
export const createdeal=(userId,token,Deal)=>{
    return fetch(`/deal/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(Deal)

    })
    .then(response=>{
        return response.json();
    })
    .catch(err => console.log(err));

};

export const createSchedule=(userId,dealId,token,Deal)=>{
    return fetch(`/activity/${dealId}/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(Deal)

    })
    .then(response=>{
        return response.json();
    })
    .catch(err => console.log(err));

};