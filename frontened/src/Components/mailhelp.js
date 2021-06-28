export const createmail=(mails)=>{
    return fetch('/mail',{
        method:"POST",
        headers:{
          
            "Content-Type":"application/json",
           
        },
        body:JSON.stringify(mails)

    })
    .then(response=>{
        return response.json();
    })
    .catch((err)=>console.log(err));

};