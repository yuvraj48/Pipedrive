import React, { useState ,useEffect} from 'react'
import { Table } from 'reactstrap';
import { isAutheticated } from '../SignC/Helper';
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import { Avatar, IconButton } from '@material-ui/core';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ListIcon from '@material-ui/icons/List';
const Deallist=() =>{
  
  const [data,setData]=useState([]);


  useEffect(() => {
    fetch(`/deal/${user._id}`,{
        headers:{
            "Content-type":"application/json",  
            Authorization:`Bearer ${token}`           
        }
    }).then(res=>res.json())
    .then(result=>{    
      console.log()
      setData(result)
    })
    
  }, []);
    
  const uppernav =()=>{
    return(
          <div className="border bg-white  ">
            <div className=" pt-2 pb-1  container-fluid mt-auto mb-auto " style={{display:"flex"}}>
              <div className="mt-auto mb-auto">
                <h5>Deals</h5>
              </div>
             
              <div className="container" >
                <div className="sidebar_search ml-auto mr-auto" style={{maxWidth:"50%"}}>
                  <div className="sidebar_searchContainer">
                    <SearchOutlined/>
                    <input placeholder="Search pipeline"  style={{width:"100%"}} />
                </div> 
              </div>
           </div>
         <div className="ml-auto mr-4">
           <button className="btn btn-sm" type="button"  data-bs-toggle="tooltip" data-bs-placement="bottom" title={name}><Avatar style={{maxWidth:"25px",maxHeight:"25px"}}/></button>
           </div>
         </div>
       </div>
      )
     }
     const {
        user: { name}
      } = isAutheticated();
      const {user,token}=isAutheticated();

      const belownav=()=>{
        return(
          <div className="ml-md-3" style={{display:"flex"}}>
           
            <div className=" p-2 " style={{maxWidth:"auto" ,display:"flex"}}>
              <div className="border bg-white "  style={{borderColor:"grey"}}>
              <a href="/deals" className="btn btn-sm shadow-none btn-link " type="button"  data-bs-toggle="tooltip"
               data-bs-placement="bottom" title="pipeline" ><EqualizerIcon style={{maxWidth:"20px",color:"#26292c"}}/></a>
              </div>
             <div className="border border-primary " style={{backgroundColor:"#eff5fd"}}> <a href="/deals/list" className="btn btn-sm shadow-none btn-link" type="button"  data-bs-toggle="tooltip"
              data-bs-placement="bottom" title="List"><ListIcon style={{maxWidth:"23px",color:"#317ae2"}}/></a></div>
             
            </div>
           
 
          </div>
        )
      }
    

    return (
        <div>
        {uppernav()}
        {belownav()}
        <Table size="sm" bordered className="bg-white" >
        <thead>
          <tr>
          <th >Title</th>
          <th >Value</th>
          <th >Organization</th>
          <th >Contact Person</th>
          <th>Expected Close Date</th>
          <th>Owner</th>
          <th>Phone </th>
          
          </tr>
        </thead>
        <tbody >
          {data.map((deal,index)=>{
            return(
              <tr key={index}>
                
                <td>{deal.title}</td>
                <td>{deal.currency}{deal.value}</td>
                <td>{deal.organization}</td>
                <td>{deal.person}</td>
                <td>{deal.enddate}</td>
                <td>{name}</td>
                <td>{deal.phone}</td>

              </tr>
            )
          })}
           
          
         
        
        </tbody>
      </Table>
      </div>
    )
}

export default Deallist
