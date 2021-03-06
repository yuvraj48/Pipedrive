export const createLead=(userId,token,lead)=>{
    return fetch(`/lead/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(lead)

    })
    .then(response=>{
        return response.json();
    })
    .catch(err => console.log(err));

};