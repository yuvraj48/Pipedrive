import React, { useState,useEffect } from 'react';
import {Row,Col,ModalFooter,Modal,ModalBody,ModalHeader,Button,Input,Label,Card, Table,CardBody} from 'reactstrap'
import { isAutheticated } from '../SignC/Helper';
import { createperson } from './ContactHelper';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Contactsidebar from './Sidebar'
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import { Avatar } from '@material-ui/core';
import { getallperson ,deletePerson} from './ContactHelper';
import {ClimbingBoxLoader} from 'react-spinners';

const Persons =()=>{
  const [inputmodal,setInputmodal]=useState(false);
  const [persons,setPersons]=useState([])
  const togg=()=>setInputmodal(!inputmodal);
  const [userDetails,setUserDetails] = useState([]);
  const [search,setSearch] = useState('');
  const [modal,setModal]=useState(false)
  const [values,setValues]=useState({
    Name:"",
    Organisation:"",
    label:"",
    phone:"",
    email:"",
    owner:"",
    error:"",
    success:false    
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setTimeout(() => setLoading(false), 2600)
    }, []);
  const toggle=()=>setModal(!modal);
  const {Name,Organisation,label,phone,email,owner,error,success}=values;

  const handleChange=Name=>event=>{
    setValues({...values,error:false,[Name]:event.target.value})
   };

  const {user,token}=isAutheticated();
  const {
    user: { name}
  } = isAutheticated();
 
 

  const loadallPerson=()=>{
    getallperson().then(data=>{
        if(data&&data.error){
            console.log(data.error)
        }
        else{
            setPersons(data);
        }
    });

};
useEffect(()=>{
  loadallPerson()
},[])

const deletethisPerson=personId=>{
  deletePerson(personId,user._id,token).then(data=>{
    if(data.error){
      console.log(data.error);
    }
    else{
      loadallPerson()
    }
  });

}


  const fetchDeals = (query)=>{
      setSearch(query)
      fetch(`/searching`,{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          query
        })
      })
      .then(res=>res.json())
      .then(results=>{
        setUserDetails(results.user)
       
    
     
      })
   }
   
const PersonData = () => {
  
  return (
    <>
    {loading === false ? (
    <div>
    {persons.length>0?
     <Table size="sm" bordered className="bg-white" >
     <thead>
       <tr>
       <th >Name</th>
       <th >Label</th>
       <th >Organisation</th>
       <th >Email</th>
       <th>Phone</th>
       <th>Owner</th>
       <th>Action</th>
       
       </tr>
     </thead>
     <tbody >
         {persons.map((person,index)=>{
             return(
               <tr key={index}>
         
             
               <td>{person.Name}</td>
               <td>{person.label}</td>
               <td>{person.Organisation}</td>
               <td>{person.email}</td>
               <td>{person.phone}</td>
               <td>{name}</td>
               
               
             
               <td> <button
                   onClick={() => {
                     deletethisPerson(person._id);
                   }}
                   className="btn btn-sm bg-white text-danger border-0 btn-danger"
                 >
                   <FontAwesomeIcon icon={faMinus}/>
                 </button></td>

             </tr>

             )
         })}
       
      
     
     </tbody>
   </Table>:
    <Card>
      <CardBody className="text-center p-5" style={{height:"250px"}}>
        <div className="mt-5">
        <h5>No People Added Yet</h5>
        <p style={{cursor:"pointer",color:"rgb(49, 122, 226)"}} onClick={toggle}>Create a new person</p>
        </div>
  
      </CardBody>

    </Card>
 }
 </div>
     ):(
      <div className=" col-md-12 text-center " style={{position:"fixed",marginTop:"14%"}} >
      <ClimbingBoxLoader color="green" />
      </div>
    )}
    </>
  );
} 

  const uppernav =()=>{
    return(
          <div className="border bg-white  "  >
            <div className=" pt-2 pb-1  container-fluid mt-auto mb-auto " style={{display:"flex"}}>
              <div className="mt-auto mb-auto">
              {Contactsidebar()}
              </div>
             
              <div className="container " style={{marginRight:"158px"}}>
                <div className="sidebar_search ml-auto mr-auto" style={{maxWidth:"40%",background:"none"}}>
                  <div className="sidebar_searchContainer">
                    <SearchOutlined/>
                    
                    <input placeholder="Search pipeline"  value={search} onKeyPress={event => {
              if (event.key === "Enter") {
               togg()
              }}} onChange={(e)=>fetchDeals(e.target.value)}  style={{width:"100%"}}/>
                     
                    <Modal   style={{position:"absolute",left:"40%",right:"40%",maxWidth:"340px",minWidth:"250px",top:"10%",display:"block"}}  isOpen={inputmodal}  backdrop={false}  >
                    
                     <ModalBody togg={togg} className="m-0 p-0" style={{minHeight:"150px"}}>
                     {userDetails.map(item=>{
                       return(
                        <ul className="list-unstyled m-0 p-0">
                          <li classname="mb-1" style={{backgroundColor:"rgba(247, 247, 247, 0.945",cursor: "pointer"}}><div className="border p-2" style={{display:'flex'}}>
                            <MonetizationOnIcon />
                            <div className="ml-3">
                              <h6 className="m-0">{item.title}</h6>
                              <p className="p-0 m-0 text-secondary" style={{fontSize:'12px'}}>{item.currency} {item.value} . {item.person} . {item.organization}</p>

                            </div>
                            
                            
                            </div></li>
                        </ul>
                       )
                     })}

                     </ModalBody>
                     <ModalFooter><CancelPresentationIcon onClick={togg}/></ModalFooter>

                    
                    </Modal>
                    
                 
                          
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

  const onSubmit=event=>{
    event.preventDefault();
    createperson(user._id,token,{Name,Organisation,label,phone,email,owner})
    .then(data=>{
      if(data.error){
        setValues({...values,error:data.error,success:false})
      }
      else{
        setValues({
          ...values,
          Name:"",
          Organisation:"",
          label:"",
          phone:"",
          email:"",
          owner:"",
          error:"",
          success:true

        })
      }
    })
  } 
 

   const personForm=()=>{
        return(
        <div>
          <Button className="btn btn-sm ml-md-3 mt-md-3" style={{fontWeight:"bold"}} color="success" onClick={toggle}>+ Person</Button>
          <Modal style={{width:"350px"}} isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>Add Person</ModalHeader>
            <ModalBody>          
              <Row >
                <Label md={12}>Name</Label>
                <Col md={12}>
                  <Input type="tex" className="form-control form-control-sm" value={Name} onChange= {handleChange("Name")}/>
                </Col>
              </Row>
              <Row >
                <Label md={12}>Organisation</Label>
                <Col md={12}>
                  <Input type="tex" className="form-control form-control-sm" value={Organisation} onChange={handleChange("Organisation")}/>
                </Col>
              </Row>
              <Row >
                <Label md={12}>Label</Label>                
               <Col md={12}>
                 <select className="border-secondary" onChange={handleChange("label")} style={{width:"320px "}}>
                   <option value="none">none</option>
                   <option value="customer">customer</option>
                   <option value="Hot lead">Hot lead</option>
                   <option value="Warm Lead">Warm Lead</option>
                   <option value="Cold lead">Cold lead</option>
                 </select>
                </Col>
              </Row>
              
              <Row >
                <Label md={12}>Phone</Label>                
               <Col md={6}>
                 <Input type="numbe" className="form-control form-control-sm " value={phone} onChange={handleChange("phone")} />                
                </Col>
                <Col md={4}>
                <select c style={{width:"150px",height:"29px"}}>
                   <option >Work</option>
                   <option>Home</option>
                   <option>Mobile</option>
                   <option>Other</option>
                   
                 </select>

                </Col>
              </Row>
              <Row  >
                <Label md={12}>Email</Label>                
               <Col md={6}>
                 <Input type="email" className="form-control form-control-sm " value={email} onChange={handleChange("email")} />                
                </Col>
                <Col md={4}>
                <select className="border-secondary" style={{width:"150px",height:"29px"}}>
                   <option>Work</option>
                   <option>Home</option>
                   <option>Mobile</option>
                   <option>Other</option>
                   
                 </select>

                </Col>
              </Row>
              <Row >
              <Label md={12}>Owner</Label> 
               
                <Col >
                <select  className="form-control" >
                  <option value={name}  >{name}</option>
                </select>
               
                </Col>
            </Row>
          

            </ModalBody>
            <ModalFooter>
              <Button color="success" type="submit" onClick={onSubmit}>Save</Button>
              <Button color="secondary"  onClick={toggle}>Cancel</Button>
              </ModalFooter>
      
          </Modal>
        </div>
      )
    }
 

    return(
      <div style={{minWidth:"1058px",maxWidth:"auto",height:"100%",minHeight:"100%",backgroundColor:"rgb(247, 247, 247)"}}>
          {uppernav()}
          {personForm()}
        <div className="mt-md-4 ml-1 mr-1">
          {PersonData()}
  
        </div>
      </div>


    )
}
export default Persons;



