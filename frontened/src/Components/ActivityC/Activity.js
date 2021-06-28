import React, { useState,useEffect } from 'react';
import {Row,Col,ModalFooter,Modal,ModalBody,ModalHeader,Button,Input,Label,Card, CardBody,Table} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay,faBars ,faFile,faEraser,faRupeeSign, faUser, faBuilding,faMinus,faPhoneAlt, faUserCircle} from '@fortawesome/free-solid-svg-icons'
import {createSchedule} from "./Activityhelper"
import { Link, useHistory } from 'react-router-dom';
import { isAutheticated } from '../SignC/Helper';
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import { Avatar } from '@material-ui/core';
import { getActivitys ,deleteActivity} from './Activityhelper';
import {ClimbingBoxLoader} from 'react-spinners'

const Schedule=()=>{
     let history =useHistory();
    const [modal,setModal]=useState(false);
    const [values,setValues]=useState({
      contact:"",
      startdate:"",
      enddate:"",
      starttime:"",
      endtime:"",
      option:"",
      notes:"",
      deal:"",
      users:"",
      organisation:"",
      person:"",
      error:"",
      success:false
    });
    
    const {
      user: { name}
    } = isAutheticated();
    const {user,token}=isAutheticated()
    const toggle=()=>setModal(!modal);
    const [activitys,setActivitys]=useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 2600)
      }, [])
  

 

    const loadallActivity=()=>{
        getActivitys().then(data=>{
            if(data&&data.error){
                console.log(data.error)
            }
            else{
                setActivitys(data);
            }
        });

    };

    const deletethisActivity=ScheduleId=>{
      deleteActivity(ScheduleId,user._id,token).then(data=>{
        if(data.error){
          console.log(data.error);
        }
        else{
          loadallActivity()
        }
      });

    }
    
    useEffect(()=>{
      loadallActivity()
    },[])
    const {person,startdate,starttime,enddate,endtime,option,notes,users,organisation,contact,deal,error,success}=values;

    const currentTab = (history, path) => {
      if (history.location.pathname == path) {  
        return {   color:"#2565AE"};
      } else {
        return { color: "#424242" };
      }
    };

  const handleChange=person=>event=>{
    setValues({...values,error:false,[person]:event.target.value})
  }




//Success and Error Message
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-12 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New activity
            <Link to="/activities">GO</Link>
          </div>
        </div>
      </div>
    );
  };
  
  const errorMessage = () => {
    return (
      <div className="row ">
        <div className="col-md-12  text-center">
          <div
            className="alert alert-danger border-0"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };




//Submit
  const onSubmit=event=>{
    event.preventDefault();
    setValues({...values,error:false})
    createSchedule(user._id,token,{contact,starttime,startdate,endtime,option,notes,users,deal,organisation,person})
    .then(data=>{
      if(data.error){
        setValues({ ...values, error: data.error,success: false});
      }
      else{
        setValues({
          ...values,
          contact:"",
          startdate:"",
          enddate:"",
          starttime:"",
          endtime:"",
          option:"",
          notes:"",
          deal:"",
          users:"",
          organisation:"",
          person:"",
          error:"",
          success:true

        });
      }
    })
    .catch((error)=>console.log("Error "));
     
  
  };



//upper navbar
  const uppernav =()=>{
    return(
          <div className="border bg-white  ">
            <div className=" pt-2 pb-1  container-fluid  " style={{display:"flex"}}>
            <div className="mt-auto mb-auto">
                <h5>Activities</h5>
              </div>
              <div className="container" >
                <div className="sidebar_search ml-auto mr-auto" style={{maxWidth:"40%"}}>
                  <div className="sidebar_searchContainer">
                    <SearchOutlined/>
                    <input placeholder="Search pipeline" style={{width:"100%"}}/>
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

 


//Activity Form
    const ActivityForm=()=>{
        return(
            <div>
      <Button className="btn btn-sm" style={{fontWeight:"bold"}} color="success" onClick={toggle}>+ Activity</Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Schedule an activity</ModalHeader>
        <ModalBody>
             {successMessage()}
             {errorMessage()}
            <Row>
                
                <Col md={12}>
              <Input id="input" className="form-control form-control-lg border border-sm" placeholder="&#xf095;"  onChange={handleChange("contact")} value={contact} required />
              <Label placeholder="Call"></Label>
                </Col>
            </Row>
            <Row className="form-group">
                <Col md={3}>
                    <Input type="date" onChange={handleChange("startdate")} value={startdate} className="form-control form-date form-control-sm input input-sm"/>
                </Col>
                <Col md={3}>
                    <Input type="time" onChange={handleChange("starttime")} value={starttime} className="form-control form-control-sm input input-sm">-</Input>
                </Col>
                
                <Col md={3}>
                    
                <Input type="time" onChange={handleChange("endtime")} value={endtime} className="form-control form-control-sm input input-sm"></Input>
                </Col>
                <Col md={3}>
                <Input type="date" onChange={handleChange("enddate")} value={enddate} className="form-control form-date form-control-sm input input-sm"/>
                </Col>
                
            </Row>
            <Row className="form-group">
                <Label><FontAwesomeIcon className="font-weight-4 ml-1 mt-2 text-secondary" icon={faEraser}  /></Label>
                <Col md={4}>
                <select
          onChange={handleChange("option")}
          className="form-control"
          
        >
          <option>Select</option>
          
              <option value="free">
                free
              </option>
              <option value="Busy">
                Busy
              </option>
            
        </select>
                </Col>
             
            </Row>
            <Row className="form-group">
                
                <Label><FontAwesomeIcon className="font-weight-4 ml-1 mt-2 text-secondary" icon={faFile}/></Label>
                <Col >
                    <Input style={{height:'100px' ,backgroundColor:'whitesmoke',border:'0'}} onChange={handleChange("notes")} value={notes} type="textarea"></Input>

                </Col>
            </Row>
            <Row className="form-group">
               <Label><FontAwesomeIcon className="font-weight-4 ml-1 mt-2 text-secondary" icon={faUserCircle}/></Label>
                <Col >
                <select  className="form-control" onChange={handleChange("users")}>
                  <option value={name}  >{name}</option>
                </select>
               
                </Col>
            </Row>
            <Row className="form-group">
               <Label><FontAwesomeIcon className="font-weight-4 ml-1 mt-2 text-secondary" icon={faRupeeSign}/></Label>
                <Col >
                  <Input type="tex" onChange={handleChange("deal")} value={deal}  placeholder="Deal or Lead"></Input>
                </Col>
            </Row>
            <Row className="form-group">
               <Label><FontAwesomeIcon className="font-weight-4 ml-1 mt-2 text-secondary"  icon={faUser}/></Label>
                <Col >
                  <Input type="tex" onChange={handleChange("person")} value={person} placeholder="People"></Input>
                </Col>
            </Row>
            <Row className="form-group">
               <Label><FontAwesomeIcon className="font-weight-4 ml-1 mt-2 text-secondary"  icon={faBuilding}/></Label>
                <Col >
                  <Input type="tex" onChange={handleChange("organisation")} value={organisation} placeholder="organisation"></Input>
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


//Activitydata
const ActivityData = () => {

    
  return (
    <>
    {loading === false ? (
    <div>
      {activitys&&activitys.length>0?
     <Table size="sm" bordered className="bg-white" >
      <thead>
        <tr>
        <th>Subject</th>
        <th>Deal</th>
        <th>Contact Person</th>
        <th>Free/Busy</th>
        <th>Notes</th>
        <th >Organisation</th>
        <th>Due date</th>
        <th >Duration</th>
        <th>Assigned to user</th>
        <th>Action</th>
        </tr>
      </thead>
      <tbody >
          {activitys.map((activity,index)=>{
              return(
                <tr key={index}>
          
                <td > <FontAwesomeIcon className="pl-1 mr-2" icon={faPhoneAlt}/>{activity.contact}</td>
                <td>{activity.deal}</td>
                <td>{activity.person}</td>
                <td>{activity.option}</td>
                <td>{activity.notes}</td>
                <td>{activity.organisation}</td>
                <td>{activity.enddate}</td>
                <td>{activity.starttime}-{activity.endtime}</td>
                <td>{name}</td>
              
                <td> <button
                    onClick={() => {
                      deletethisActivity(activity._id);
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
        <p style={{cursor:"pointer",color:"rgb(49, 122, 226)"}} onClick={toggle}>Create a new Activity</p>
        </div>
  
      </CardBody>

    </Card>
  }
    </div>
    ):(
      <div className=" col-md-12 text-center " style={{position:"fixed",marginTop:"13%"}} >
      <ClimbingBoxLoader color="green" />
      </div>
    )}
    </>
  );
}



return(
    <div style={{minWidth:"1058px",maxWidth:"auto",height:"100%",minHeight:"100%"}}>   
      {uppernav()} 
        <Row className=" mr-0 mt-2   ml-md-4" >
          <div class="col-xs-2 border border-primary bg-light col-xs-offset-4 pr-3" style={{height:"30px"}}>
            <Link to='/activities' style={currentTab(history, "/activities")} ><span   style={{fontSize:"15px"}}><FontAwesomeIcon icon={faBars}/></span></Link></div>
           <div class="col-xs-2 border border-secondary pr-3" style={{height:"30px"}}> <Link to='/activities/calendar' style={currentTab(history, "/activities/calendar")} ><span   style={{fontSize:"15px"}}><FontAwesomeIcon icon={faCalendarDay} /></span></Link></div>

          <Col sm={2}>
             {ActivityForm()}
           </Col>      
       </Row>          
      <div className="mt-4">{ActivityData()}</div>
    
    </div>

)

}
export default Schedule;