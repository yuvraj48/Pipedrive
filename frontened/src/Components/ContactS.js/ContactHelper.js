import { isAutheticated } from "../SignC/Helper";
 const { user, token } = isAutheticated();
 
export const createperson=(userId,token,Person)=>{
    return fetch(`/person/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(Person)

    })
    .then(response=>{
        return response.json();
    })
    .catch(err => console.log(err));

};

export const getallperson=()=>{
    return fetch(`/people/${user._id}`,{
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
};

export const deletePerson = (personId, userId, token) => {
    return fetch(`/person/${personId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

export const updatePerson=(PersonId,userId,token,Person)=>{
return fetch(`/person/${PersonId}/${userId}`,{
    method:"PUT",
    headers:{
        Accept:"application/json",
        Authorization:`Bearer ${token}`
    },
    body:Person
})
.then(response => {
    return response.json();
})
.catch(err => console.log(err));
}

//..................organisation.....................//

export const createorganisation=(userId,token,organization)=>{
    return fetch(`/organisation/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(organization)

    })
    .then(response=>{
        return response.json();
    })
    .catch(err => console.log(err));

};

export const getorganisation=()=>{
    return fetch(`/organisation`,{
        method:"GET"
        
    })
    .then(response=>{
        return response.json()
    })
    .catch(err => console.log(err));
};
export const deleteOrganisation = (organisationId, userId, token) => {
    return fetch(`/organisation/${organisationId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

export const updateOrganisation=(organisationId,userId,token,organization)=>{
return fetch(`/organisation/${organisationId}/${userId}`,{
    method:"PUT",
    headers:{
        Accept:"application/json",
        Authorization:`Bearer ${token}`
    },
    body:organization
})
.then(response => {
    return response.json();
})
.catch(err => console.log(err));
}
