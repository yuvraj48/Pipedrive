import { isAutheticated } from "../SignC/Helper";

const {user,token}=isAutheticated()

export const createproduct=(userId,token,Product)=>{
    return fetch(`/product/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(Product)

    })
    .then(response=>{
        return response.json();
    })
    .catch(err => console.log(err));

};

export const getallproduct=()=>{
    return fetch(`/products/${user._id}`,{
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

export const deleteProduct = (ProductId, userId, token) => {
    return fetch(`/product/${ProductId}/${userId}`, {
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

export const updateProduct=(ProductId,userId,token,Product)=>{
return fetch(`/product/${ProductId}/${userId}`,{
    method:"PUT",
    headers:{
        Accept:"application/json",
        Authorization:`Bearer ${token}`
    },
    body:Product
})
.then(response => {
    return response.json();
})
.catch(err => console.log(err));
}