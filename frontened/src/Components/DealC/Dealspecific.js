import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody ,CardHeader,Label,Modal,ModalBody,ModalFooter,ModalHeader,Row,Col,Input, Form} from 'reactstrap';
import { isAutheticated } from '../SignC/Helper';
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import { Avatar, IconButton } from '@material-ui/core';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile,faEraser,faRupeeSign, faUser, faBuilding, faUserCircle,faDollarSign} from '@fortawesome/free-solid-svg-icons';
import LocalPhoneTwoToneIcon from '@material-ui/icons/LocalPhoneTwoTone';
import {createSchedule} from './DealHelper';
import Moment from 'react-moment';

function Specificdeal() {
    const [userDetails,setUserDetails] = useState([]);  
    const [search,setSearch] = useState('') ;
    const [activitys,setActivity]=useState([]);
    const [data,setData]=useState([]);
    const [inputmodal,setInputmodal]=useState(false)
    const {dealid}=useParams(); 
    const [show,setShow]=useState(false);
    const [subsd,setSubsd]=useState("")
    const [act,setAct]=useState(false);
    const [payment,setPayment]=useState(false)
    const toggl=()=>setPayment(!payment);
    const tog=()=>setAct(!act);
    const toggle=()=>setShow(!show);
    const togg=()=>setInputmodal(!inputmodal);
    const [amount,setAmount]=useState("");
    const [inter,setInter]=useState("");
    const [totalpayment,setTotalpayment]=useState("");
    const [description,setDescription]=useState("");
    const [startingdate,SetStartingdate]=useState("");
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
    const {person,startdate,starttime,enddate,endtime,option,notes,users,organisation,contact,deal,error,success}=values;

    const handleChange=person=>event=>{
      setValues({...values,error:false,[person]:event.target.value})
    };
 

    const onSubmit=event=>{
      event.preventDefault();
      setValues({...values,error:false})
      createSchedule(user._id,dealid,token,{contact,starttime,startdate,endtime,option,notes,users,deal,organisation,person})
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
        window.location.reload();
      })
      .catch((error)=>console.log("Error ")); 
    };
    
  
    const {
        user: { name}
      } = isAutheticated();
      const {user,token}=isAutheticated();

         
     /* const makesubscription =(amount,dealId)=>{
        fetch(`/subscription/${dealId}/${user._id}`,{
            method:"put",
            headers:{
                "Content-type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify({
              amount,
                dealId
                
               
            })
        }).then(res=>res.json())
        .then(result=>{
          
            setData(result);
        })
    };*/
    useEffect(() => {
      fetch(`/deals/${dealid}/${user._id}`,{
          headers:{
              "Content-type":"application/json",  
              Authorization:`Bearer ${token}`           
          }
      }).then(res=>res.json())
      .then(result=>{
    
        setData(result);     
      })
      
    }, []);
    useEffect(() => {
      fetch(`/deals/${dealid}/${user._id}`,{
          headers:{
              "Content-type":"application/json",  
              Authorization:`Bearer ${token}`           
          }
      }).then(res=>res.json())
      .then(result=>{
        const newdata=result.map(item=>{
          return item.subscriptions
        })
     
    
        setSubsd(newdata);     
      })
      
    }, []);

    const makeComment =(dealid,amount,description,totalpayment,inter,startdate)=>{
      fetch(`/subscription/${user._id}`,{
          method:"put",
          headers:{
              "Content-type":"application/json",
              Authorization:`Bearer ${token}`
          },
          body:JSON.stringify({
              amount,
              inter,
              totalpayment,
              description,
              startdate,
              dealId:dealid
             
          })
      }).then(res=>res.json())
      .then(result=>{
        const newData=data.map(item=>{
          if(item._id==result._id){
              return result
          }
          else{
              return item
          }
      })
       
          setData(newData)
      })
  };

    
   const Winner=(dealid)=>{
    fetch(`/win/${dealid}/${user._id}`,{
        method:"put",
        headers:{
            "Content-type":"application/json",
             Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({
            dealId:dealid
        })
    }).then(res=>res.json())
    .then(result=>{
    const newData=data.map(item=>{
      if(item._id==result._id){
          return result
      }
      else{
          return item
      }
  })
  setData(newData)
        
    })

};
const Loser=(dealid)=>{
  fetch(`/lose/${dealid}/${user._id}`,{
      method:"put",
      headers:{
          "Content-type":"application/json",
           Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
          dealId:dealid
      })
  }).then(res=>res.json())
  .then(result=>{
  const newData=data.map(item=>{
    if(item._id==result._id){
        return result
    }
    else{
        return item
    }
})
setData(newData)
      
  })

};

    useEffect(() => {
      fetch(`/dealactivity/${dealid}`,{
          headers:{
              "Content-type":"application/json",  
           
          }
      }).then(res=>res.json())
      .then(result=>{
        setActivity(result)
      
          
      })
      
    }, []);

    useEffect(() => {
      fetch(`/deals/${dealid}/${user._id}`,{
          headers:{
              "Content-type":"application/json",  
              Authorization:`Bearer ${token}`           
          }
      }).then(res=>res.json())
      .then(result=>{
         result.map(item=>{
          return(
            setValues({
              ...values,
              contact:"",
              startdate:"",
              enddate:"",
              starttime:"",
              endtime:"",
              option:"",
              notes:"",
              deal:item&&item.title ,
              users:"",
              organisation:"",
              person:item&&item.person,
    
            })
          )
        })
     
      
          
      })
      
    }, []);

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
    const uppercard=()=>{
        return(
        <Card className="ml-4 mt-3 mr-4">
            <CardBody>
              {data.map(item=>{
                return(            
                <div>
                  
              
                <div style={{display:"flex"}}>
                    <div>
                        <h4 className="text-primary">{item.title}</h4>
                    </div>
                    <div className="ml-auto " style={{display:"flex"}}>
                        <div className="p-1" style={{display:"flex"}} >
                        <Avatar className="mb-auto mt-auto " style={{width:"30px" ,height :"30px"}}/>
                        
                         <h6 className="pl-2 pr-2">{item.dealuser.name}</h6>
                        
                        </div>
                        {!item.Win.includes(item._id)&&!item.Lose.includes(item._id)?
                        <div style={{display:"flex"}}>
                          <div className="mr-2 ml-2">
                          <Button style={{height:"32px",fontWeight:"bold",width:"60px"}} className="text-center mt-auto mb-auto p-1" color="success" onClick={()=>Winner(item._id)}>Win</Button>
                          </div>
                          <div className="mr-2">
                          <Button style={{height:"32px",fontWeight:"bold",width:"60px"}} className="text-center mt-auto mb-auto p-1" color="danger" onClick={()=>Loser(item._id)}>Lose</Button>
                        </div>
                                
                        </div>:
                        <div>
                        {item.Win.includes(item._id)?<h6 style={{color:"white",background:"green",borderRadius:"22px",fontWeight:"bold",padding:"8px"}} className="mr-5 pl-3 pr-3">Win</h6>:<div>{item.Lose.includes(item._id)?<h6 style={{color:"white",background:"red",borderRadius:"22px",fontWeight:"bold",padding:"8px"}}>Lose</h6>:<h6>Lo</h6>}</div>
              }
              </div>
                      }
                          
                    </div>
                </div>
                <div style={{display:"flex"}} className="mt-3">
                    <div style={{display:"flex"}}> <h5>{item.currency}.{item.amount?item.amount:0}</h5>
                    <p className="ml-3 " style={{color:"lightgray"}}>|</p>
                        <h6 className="ml-3"><PersonIcon/>{item.person}</h6>
                        <h6 className="ml-3" style={{color:"lightgray"}}>|</h6>
                        <h6 className="ml-3 "><BusinessIcon/>{item.organization}</h6></div>
                        <div className="ml-auto">
                            <h6><EmojiFlagsIcon/>{item.enddate}</h6>
                        </div>
                       
                        
                    

                </div>
                </div>
                  )
                })}
            </CardBody>
        </Card>)
    }
     /*<Moment format="YYYY/MM/DD">{item.createdAt}</Moment> */
    const subscriptionform=()=>{
      return(
        <div>
        <Modal   style={{maxWidth: '600px',marginTop:"0px"}} isOpen={show} toggle={toggle}  >
        <ModalHeader className="bg-light" toggle={toggle} >SetUp Subscription</ModalHeader>
        <ModalBody >
       
              <div> 
                <Form >
                  <Row className="form-group">
                    <Label className="ml-2" md={4}>Recurring Amount(inr)</Label>
                    <Col md={7}>
                    <Input type="number" className="form-control form-control-sm " onChange={(e)=>setAmount(e.target.value)} value={amount}/>
                    </Col>
                  </Row> 

                  <Row className="form-group">
                    <Label className="ml-2" md={4}>Description</Label>
                    <Col md={7}>
                    <Input type="textarea" className="form-control form-control-sm" onChange={(e)=>setDescription(e.target.value)} value={description}/>
                    </Col>
                  </Row> 
                  <Row className="form-group">
                    <Label className="ml-2" md={4}>Number of payments</Label>
                    <Col md={3}>
                    <Input type="number" className="form-control form-control-sm" onChange={(e)=>setTotalpayment(e.target.value)} value={totalpayment}/>
                    </Col>
                  </Row> 
                  <Row className="form-group">
                    <Label className="ml-2" md={4}>Interval</Label>
                    <Col md={6}>
                    <select className="form-control form-control-sm"  onChange={(e)=>setInter(e.target.value)}>
                      <option value="Yearly">Yearly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="monthly">monthly</option>
                      <option value="totalpayment">totalpayment</option>
                    </select>
                    </Col>
                  </Row> 
                  <Row className="form-group">
                    <Label className="ml-2" md={4}>Interval</Label>
                    <Col md={6}>
                      <Input type="date" className="form-control form-control-sm"  onChange={(e)=>SetStartingdate(e.target.value)} value={startingdate}/>
                      </Col>
                      </Row>
               
                 
                      <Button color="success" onClick={()=>makeComment(dealid,amount,description,totalpayment,inter,startingdate)} >Save</Button>
                  </Form>
                </div> 
              
        </ModalBody>
    
        </Modal>

        </div>
      ) 
    }


    const ActivityForm=()=>{
      return(
          <div>
            <Modal isOpen={act} toggle={tog} >
      <ModalHeader toggle={tog}>Schedule an activity</ModalHeader>
      <ModalBody>
          
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
               <Label><FontAwesomeIcon className="font-weight-4 ml-1 mt-2 text-secondary" icon={faDollarSign}/></Label>
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
        <Button color="success" onClick={onSubmit} type="submit" >Save</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
      
    </Modal>
          </div>
      )
  }


    const belowcard=()=>{
        return(
            <div className="col-12" style={{display:"flex"}}>
              {data.map(item=>{
                return(
            <div className=" col col-4">
              

          
           <Card  className="mt-2">
               <CardHeader style={{color:"darkviolet",background:"white",fontSize:"12px",fontWeight:"bold"}}>REVENUE</CardHeader>
               <CardBody>
                
                 <Row>
                   <Col>
                   {subsd.length>0?(
                    <div>
                  
                   {
                     data.map(item=>{
                       return(
                         <div>
                      
                           {item.subscriptions.map(subs=>{
                             return(
                               <div>
                               <Row>
                                 <Col>
                                 <h5>Subscriptions</h5>
                                 </Col>
                               </Row>
                                    <Row>
                                    <Col>
                                    <h6>{subs.description}</h6>
                                    </Col>
                                  </Row>
                                  <Row>
                                 <Col>
                                 <div style={{display:"flex"}}>
                                   <h6 style={{fontSize:"14px"}}>Rs.{subs.totalpayment}.{subs.inter}</h6>
                                   <div className="ml-auto">
                                     <h6><span className="border rounded bg-success">Active</span></h6>
                                     

                                   </div>

                                 </div>
                                 
                                 </Col>
                               </Row>
                                  </div>
                             )
                           })}
                         </div>
                       )
                     })
                   }
                   </div>):
                   <div>
                    <Row>
                   <Col>
                   <h6>Choose a billing plan</h6>
                   <button onClick={toggle} className="bg-white border-0 text-primary" style={{fontWeight:"bold",outline:"none"}}>+Subscription</button>
                   </Col>
                 </Row>
                     </div>}
                  
                   </Col>
                   </Row>
                
                   
                  
               
               </CardBody>
           </Card>

           <Card  className="mt-2">
               <CardHeader style={{color:"darkviolet",background:"white",fontSize:"12px",fontWeight:"bold"}}>ORGANIZATION</CardHeader>
               <CardBody>
                 <div className="ml-5" style={{display:"flex"}} >
                   <div className="border rounded-circle p-2 text-primary"> <BusinessIcon /></div>
                  <div className="mt-auto mb-auto ml-2"> <h6>{item.organization}</h6></div>
                  

                 </div>
               </CardBody>
           </Card>

           <Card  className="mt-2">
               <CardHeader style={{color:"darkviolet",background:"white",fontSize:"12px",fontWeight:"bold"}}>PERSON</CardHeader>
               <CardBody>
                 <Row>
                   <Col>
                   <div className="ml-5" style={{display:"flex"}}>
                     <div  className="border rounded-circle p-2 ml-2 text-primary">
                     <PersonIcon/>
                    </div>
                    <div className="mt-auto mb-auto ml-3">  <h6>{item.person}</h6></div>                  
                   </div>
                   </Col>
                 </Row>
                 <Row className="ml-5 mt-auto mb-auto">
                   <Label className="text-secondary mt-1" style={{fontSize:"12px",fontWeight:"bold"}}>First Name</Label>
                   <Col  style={{fontSize:"14px"}}>
                     {item.person}
                   </Col>
                 </Row>
                 <Row className="ml-5 mt-auto mb-auto">
                   <Label className="text-secondary mt-1 ml-4" style={{fontSize:"12px",fontWeight:"bold"}}>Phone</Label>
                   <Col  style={{fontSize:"14px"}}>
                      {item.phone}
                   </Col>
                 </Row>
                 <Row className="ml-5 mt-auto mb-auto">
                   <Label className="text-secondary mt-1 ml-4" style={{fontSize:"12px",fontWeight:"bold"}}>Email</Label>
                   <Col  style={{fontSize:"14px"}} className="text-primary">
                     <h6 style={{fontSize:"14px"}}>{item.email}</h6>
                   </Col>
                 </Row>
               </CardBody>
           </Card>
           <Card  className="mt-2">
               <CardHeader style={{color:"darkviolet",background:"white",fontSize:"12px",fontWeight:"bold"}}>PARTICIPANT</CardHeader>
               <CardBody>
                 <div style={{display:"flex"}}>
                   <PersonIcon/>
                   <div className="text-primary"> {item.person}</div>
                  

                 </div>
               </CardBody>
           </Card>
          
         
           <Card  className="mt-2">
               <CardHeader style={{color:"darkviolet",background:"white",fontSize:"12px",fontWeight:"bold"}}>Email bcc</CardHeader>
               <CardBody>
                 <Row>
                   <Label md={12} className="text-secondary">Universal adress</Label>
                   <Col md={12}>
                   <h6 className="border p-1 bg-light">{item.dealuser.email}</h6>
                   </Col>
                 </Row>
               </CardBody>
           </Card>
            </div>
            
            )
          })}
            <div className="col-8">
                <Card className="col-12 bg-light border-0">
                    <Button  className="col-4 text-center ml-auto mr-auto border-0 text-primary bg-white btn btn-outline-light"  onClick={tog} style={{fontWeight:"bold"}}>+ Schedule an activity</Button>
                   
                </Card>
                <div className="text-center p-3">
                  <h6 ><span className="border pl-3 rounded bg-secondary text-white  pr-3">Planned</span></h6>
                </div>
                {activitys.map(item=>{
             return(
  
         <div style={{display:"flex"}} className="col-12  ">
           <div className="border mt-auto mb-auto bg-white" style={{borderRadius:"50px"}}>
             <LocalPhoneTwoToneIcon style={{fontSize:"35px"}} className="p-1" />

           </div>
           <div className=" col-12 "> 
             <Card className="p-1" > 
             <Row className="pl-3 pt-2">
               <Col>{item.contact}</Col>
             </Row>
             <Row className="pl-3 pb-2 pt-1">
               <Col>
               <div style={{display:"flex"}}>
                 <div >
                 
                 {<Moment format="MMM Do ">{item.createdAt}</Moment>}
                 </div>
                 <div className="pl-2 ">
                   <h6 style={{fontSize:"14px",color:"grey"}} >. {name}</h6>
                 </div>
                 <div className="pl-2" style={{display:"flex"}}><PersonIcon style={{fontSize:"18px",color:"	#303030"}} /><h6 style={{fontSize:"14px",color:"grey"}} >{item.person}</h6>
                 </div>
                 <div className="pl-2  mt-auto mb-auto
                 
                 " style={{display:"flex"}}>
                   <BusinessIcon style={{fontSize:"18px",color:"	#303030"}}/><h6 style={{fontSize:"14px", color:"grey"}} >{item.organisation}</h6>
                 </div>
               </div>
               </Col>
             </Row>
             </Card>
           </div>

         </div>
                      
          )
          })}

            </div>
            </div>
        )
    };


    const uppernav =()=>{
        return(
              <div className="border bg-white  "  >
                <div className=" pt-2 pb-1  container-fluid mt-auto mb-auto " style={{display:"flex"}}>
                  <div className="mt-auto mb-auto">
                    <h5>Deals</h5>
                  </div>
                 
                  <div className="container " style={{marginLeft:"7%"}}>
                    <div className="sidebar_search ml-auto mr-auto" style={{maxWidth:"50%",background:"none"}}>
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


   /*  const Scheduleform=()=>{
       return(
         <div>
            <Button size="sm" color="success" onClick={toggle}>+ Deal</Button>
      <Modal size="lg" style={{maxWidth: '680px',marginTop:"0px"}} isOpen={modal} toggle={toggle}  >
        <ModalHeader toggle={toggle} >Modal title</ModalHeader>
        <ModalBody>
          <Row>
            <Label md={12}>Recurring amount </Label>
            <Col>
            <Input md={12} type="number" className=" form-control form-control-sm" value={person} onChange={handleChange('person')}/>
            </Col>
          </Row>

          <Row>
            <Label md={12}>Contact Person</Label>
            <Col>
            <Input md={12} type="tex" className=" form-control form-control-sm" value={person} onChange={handleChange('person')}/>
            </Col>
          </Row>
          <Row>
            <Label md={12}>Contact Person</Label>
            <Col>
            <Input md={12} type="tex" className=" form-control form-control-sm" value={person} onChange={handleChange('person')}/>
            </Col>
          </Row>
         
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={toggle} onClick={onSubmit}>Save</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
         </div>
       )
     }*/
        
    return (
        <div  style={{minWidth:"1058px",maxWidth:"auto",height:"100%",minHeight:"100%"}}>
            {uppernav()}
            {subscriptionform()}
             {ActivityForm()}
            {uppercard()}
            {belowcard()}
            
        </div>
    )
}

export default Specificdeal;