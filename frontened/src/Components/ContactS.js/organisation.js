import React, { useState } from 'react';
import {Row,Col,ModalFooter,Modal,ModalBody,ModalHeader,Button,Input,Label,Card, CardGroup} from 'reactstrap'
import { isAutheticated } from '../SignC/Helper';
import Organisationsidebar from './organisationsidebar'
import OrganisationData from './organisationdata';
import {createorganisation} from './ContactHelper'
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import { Avatar } from '@material-ui/core';

const Organisations =()=>{
  const [modal,setModal]=useState(false)
  const [values,setValues]=useState({
    Name:"",
    label:"",
    Owner:"",
    Adress:"",
    error:"",
    success:false
    

  })
  const {Name,label,Owner,Adress, success,error}=values;

  const handleChange=name=>event=>{
    setValues({...values,error:false,[name]:event.target.value})
  };

  const onSubmit=event=>{
    event.preventDefault();
    setValues({...values,error:false})
    createorganisation(user._id,token,{Name,label,Owner,Adress})
    .then(data=>{
      if(data&&data.error){
        setValues({...values,error:data.error,success:false})
      }
      else{
        setValues({
          ...values,
          Name:"",
          label:"",
          Owner:'',
          Adress:"",
          success:true,
          error:""
        })
      }
    })
  }

   
  const uppernav =()=>{
    return(
          <div className="border bg-white  ">
            <div className=" pt-2 pb-1  container-fluid  " style={{display:"flex"}}>
              {Organisationsidebar()}
              <div className="container" >
                <div className="sidebar_search ml-auto mr-auto" style={{maxWidth:"40%"}}>
                  <div className="sidebar_searchContainer">
                    <SearchOutlined/>
                    <input placeholder="Search pipeline" style={{width:"100%"}} />
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

  const toggle=()=>setModal(!modal)
  const {
    user: { name}
  } = isAutheticated();
  const {user,token}=isAutheticated();


      const organisationForm=()=>{
        return(
        <div>
          <Button className="btn btn-sm ml-md-3 mt-md-3" style={{fontWeight:"bold"}} color="success" onClick={toggle}>+ organisation</Button>
          <Modal style={{width:"350px"}} isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>Add Organisation</ModalHeader>
            <ModalBody>          
              <Row >
                <Label md={12}>Name</Label>
                <Col md={12}>
                  <Input type="tex" className="form-control form-control-sm" onChange={handleChange("Name")} value={Name} />
                </Col>
              </Row>
             
              <Row >
                <Label md={12}>Label</Label>                
               <Col md={12}>
                 <select className="border-secondary" style={{width:"320px ",height:"30px"}} onChange={handleChange("label")} >
                   <option>none</option>
                   <option value="customer">customer</option>
                   <option value="Hot Lead">Hot lead</option>
                   <option value="Warm Lead"> Warm Lead</option>
                   <option value="Cold lead">Cold lead</option>
                 </select>
                </Col>
              </Row>
                                        
              <Row >
              <Label md={12}>Owner</Label> 
               
                <Col >
                <select  className="form-control" onChange={handleChange("Owner")} >
                  <option value={name}  >{name}</option>
                </select>
               
                </Col>
            </Row>
            <Row >
                <Label md={12}>Adress</Label>
                <Col md={12}>
                  <Input type="tex" className="form-control form-control-sm" onChange={handleChange("Adress")}></Input>
                </Col>
              </Row>
          

            </ModalBody>
            <ModalFooter>
              <Button color="success" type="submit" onClick={onSubmit}>Save</Button>
              <Button color="secondary" onClick={toggle}>Cancel</Button>
              </ModalFooter>
      
          </Modal>
        </div>
      )
        

      }
 
 
 



    return(
      <div>
          {uppernav()}        
          {organisationForm()}
      <div className="mt-md-5 ml-2 mr-2">
         {OrganisationData()}
      </div>
      </div>
        

    )
}
export default Organisations;