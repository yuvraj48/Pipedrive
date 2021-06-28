
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState ,useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CardGroup ,Card,Row,Col, Label,Input} from 'reactstrap';
import { faUser} from '@fortawesome/free-solid-svg-icons';
import Board from "./Board"
import Movingcard from "./Dragingcard.js";
import {createdeal} from "./DealHelper"
import { isAutheticated } from '../SignC/Helper';
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import { Avatar, IconButton } from '@material-ui/core';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ListIcon from '@material-ui/icons/List';
import PersonIcon from '@material-ui/icons/Person';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import { Link } from 'react-router-dom';
import {ClimbingBoxLoader} from 'react-spinners';

const ModalExample = () => {
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = React.useState(false)
  const onClick = () => setShowResults(true)
  useEffect(() => {
      setTimeout(() => setLoading(false), 2600)
    }, []);
 
  const [deals,setDeals]=useState({
    person:"",
    type:"",
    organization:"",
    title:"",
    value:"",
    currency:"",
    enddate:"",
    dealuser:"",
    phone:"",
    email:"",
    success:false,
    error:""

  })
  const [data,setData]=useState([]);
  const [contact,setContact]=useState([]);
  const [meeting,setMeeting]=useState([]);
  const [need,setNeed]=useState([]);
  const [proposal,setProposal]=useState([]);
  const [negotiation,setNegotiation]=useState([]);
  const [dealsdata,setDealsdata]=useState([]);
  const [userDetails,setUserDetails] = useState([]);
  const [search,setSearch] = useState('');
  const [modal, setModal] = useState(false);
  const [inputmodal,setInputmodal]=useState(false)

  const togg=()=>setInputmodal(!inputmodal);
  const toggle = () => setModal(!modal);

  //searchdeals
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
 };
 const onTextChanged=event=>{
  const value=event.target.value;
  
  if(value.length>0){
    fetchDeals(value)
  }
  else{
    fetchDeals(null)
  }

};
  

  const {person,type,organization,title,value,currency,enddate,dealuser,phone,email} = deals;

  const handleChange=person=>event=>{
    setDeals({...deals,error:false,[person]:event.target.value})
  };

  //data of logined user
  
  const {
    user: { name}
  } = isAutheticated();
  const {user,token}=isAutheticated();

  //data of boards
  useEffect(() => {
    fetch(`/Qualified/${user._id}`,{
        headers:{
            "Content-type":"application/json",  
            Authorization:`Bearer ${token}`           
        }
    }).then(res=>res.json())
    .then(result=>{
  
      setData(result);     
    })
    
}, [])
useEffect(() => {
  fetch(`/needs/${user._id}`,{
      headers:{
          "Content-type":"application/json",  
          Authorization:`Bearer ${token}`           
      }
  }).then(res=>res.json())
  .then(result=>{

    setNeed(result);     
  })
  
}, [])
useEffect(() => {
  fetch(`/meeting/${user._id}`,{
      headers:{
          "Content-type":"application/json",  
          Authorization:`Bearer ${token}`           
      }
  }).then(res=>res.json())
  .then(result=>{

    setMeeting(result);     
  })
  
}, [])
useEffect(() => {
  fetch(`/negotiation/${user._id}`,{
      headers:{
          "Content-type":"application/json",  
          Authorization:`Bearer ${token}`           
      }
  }).then(res=>res.json())
  .then(result=>{

    setNegotiation(result);     
  })
  
}, [])
useEffect(() => {
  fetch(`/proposal/${user._id}`,{
      headers:{
          "Content-type":"application/json",  
          Authorization:`Bearer ${token}`           
      }
  }).then(res=>res.json())
  .then(result=>{

    setProposal(result);     
  })
  
}, [])
useEffect(() => {
  fetch(`/contact/${user._id}`,{
      headers:{
          "Content-type":"application/json",  
          Authorization:`Bearer ${token}`           
      }
  }).then(res=>res.json())
  .then(result=>{

    setContact(result);     
  })
  
}, [])


  const onSubmit=event=>{
    event.preventDefault();
    setDeals({...deals,error:false})
    createdeal(user._id,token,{person,type,organization,title,value,currency,enddate,dealuser,phone,email})
    .then(data=>{
      if(data&&data.error){
        setDeals({...deals,error:data.error,success:false})
      }
      else{
        setDeals({
          person:"",
          type:"",
          organization:"",
          title:"",
          value:"",
          currency,
          enddate:"",
          user:"",
          phone:"",
          email:"",
          success:true,
          error:""
        })
      }
      window.location.reload();
    });
  };
 /* onKeyPress={event => {
    if (event.key === "Enter") {
    togg()
    }}}*/

  const uppernav =()=>{
    return(
          <div className="border bg-white  "  >
            <div className=" pt-2 pb-1  container-fluid mt-auto mb-auto " style={{display:"flex"}}>
              <div className="mt-auto mb-auto">
                <h5>Deals</h5>
              </div>
             
              <div className="container " style={{marginLeft:"7%"}}>
                <div className="sidebar_search ml-auto mr-auto" style={{maxWidth:"40%",minWidth:"40%",background:"none"}}>
                  <div className="sidebar_searchContainer">
                    <SearchOutlined/>
                    <form  style={{width:"100%"}}>
                    <input placeholder="Search pipeline"  value={search}      onChange={onTextChanged}    className="form-control border-0" style={{minWidth:"100%",boxShadow:'none'}} />
                     
              
                     {userDetails.map(item=>{
                       return(
                        <ul className="listbox ">
                            <Link style={{textDecoration:"none"}} to={"/deals/"+item._id+"/"+user._id}>
                          <li classname="mb-1" style={{backgroundColor:"rgba(247, 247, 247, 0.945",cursor: "pointer"}}><div className="border p-2" style={{display:'flex'}}>
                            <MonetizationOnIcon style={{color:"black"}} />
                            <div className="ml-3">
                              <h6 className="m-0 text-dark">{item.title}</h6>
                              <p className="p-0 m-0 text-secondary" style={{fontSize:'12px'}}>{item.currency} {item.value} . {item.person} . {item.organization}</p>

                            </div>
                            
                            
                            </div></li>
                            </Link>
                        </ul>
                       )
                     })}
                     </form>

                  
                    
                 
                          
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

     const belownav=()=>{
       return(
         <div className="ml-md-3" style={{display:"flex",backgroundColor:"rgb(247, 247, 247)"}}>
          
           <div className=" p-2 " style={{maxWidth:"auto" ,display:"flex"}}>
             <div className="border  border-primary" >
             <a href="/deals" className="btn btn-sm shadow-none btn-link " type="button"  data-bs-toggle="tooltip"
              data-bs-placement="bottom" title="pipeline" ><EqualizerIcon style={{maxWidth:"20px",color:"#317ae2"}}/></a>
             </div>
            <div className="border bg-white" style={{borderColor:"grey"}}> <a href="/deals/list" className="btn btn-sm shadow-none btn-link" type="button"  data-bs-toggle="tooltip"
             data-bs-placement="bottom" title="List"><ListIcon style={{maxWidth:"23px",color:"#26292c"}}/></a></div>
            
           </div>
           <div>
             {dealForm()}
           </div>
          

         </div>
       )
     }
  const dealForm=()=>{
  return (
    <div className="p-2">
      <Button size="sm" color="success" onClick={toggle}>Add Deal</Button>
      <Modal size="lg" style={{maxWidth: '680px',marginTop:"0px"}} isOpen={modal} toggle={toggle}  >
        <ModalHeader toggle={toggle} >Modal title</ModalHeader>
        <ModalBody>
            <CardGroup  className="border-0">
                <Card className="col-md-6 border-top-0 border-bottom-0 border-left-0 ">
                    <Row>
                        <Label md={12}>Contact Person</Label>
                        <Col>
                        <Input md={12} type="tex" placeholder="&#xf007;"  required className=" form-control form-control-sm" value={person} onChange={handleChange('person')}/>
                        </Col>
                    </Row>
                    <Row>
                        <Label md={12}>Organisation</Label>
                        <Col>
                        <Input md={12} type="tex" placeholder="&#xf0f7;"  required className=" form-control form-control-sm" value={organization} onChange={handleChange('organization')}/>
                        </Col>
                    </Row>
                    <Row>
                        <Label md={12}>Title</Label>
                        <Col>
                        <Input md={12} type="tex" className=" form-control form-control-sm" value={title} onChange={handleChange('title')}/>
                        </Col>
                    </Row>
                    <Row>
                        <Label md={12}>Value</Label>
                        <Col md={6}>
                        <Input md={12} type="tex" className=" form-control form-control-sm"/>
                        </Col>
                        <Col md={4}>
                            <select className="border rounded form-control form-control-sm" style={{width:"120px"}} value={currency} onChange={handleChange('currency')}> 
                            <option value="USD" >United States Dollars</option>
               <option value="EUR">Euro</option>
                  <option value="GBP">United Kingdom Pounds</option>
                     <option value="DZD">Algeria Dinars</option>
                      <option value="ARP">Argentina Pesos</option>
                       <option value="AUD">Australia Dollars</option>
                         <option value="ATS">Austria Schillings</option>
                            <option value="BSD">Bahamas Dollars</option>
                               <option value="BBD">Barbados Dollars</option>
                          <option value="BEF">Belgium Francs</option>
                        <option value="BMD">Bermuda Dollars</option>
                    <option value="BRR">Brazil Real</option>
                <option value="BGL">Bulgaria Lev</option>
             <option value="CAD">Canada Dollars</option>
                 <option value="CLP">Chile Pesos</option>
                  <option value="CNY">China Yuan Renmimbi</option>
                     <option value="CYP">Cyprus Pounds</option>
                           <option value="CSK">Czech Republic Koruna</option>
                            <option value="DKK">Denmark Kroner</option>
                               <option value="NLG">Dutch Guilders</option>
                                  <option value="XCD">Eastern Caribbean Dollars</option>
                                 <option value="EGP">Egypt Pounds</option>
                               <option value="FJD">Fiji Dollars</option>
                              <option value="FIM">Finland Markka</option>
                          <option value="FRF">France Francs</option>
                       <option value="DEM">Germany Deutsche Marks</option>
                    <option value="XAU">Gold Ounces</option>
                 <option value="GRD">Greece Drachmas</option>
                     <option value="HKD">Hong Kong Dollars</option>
                       <option value="HUF">Hungary Forint</option>
                          <option value="ISK">Iceland Krona</option>
                                <option value="INR" selected="selected">(INR)</option>
                                    <option value="IDR">Indonesia Rupiah</option>
                                       <option value="IEP">Ireland Punt</option>
                                   <option value="ILS">Israel New Shekels</option>
                               <option value="ITL">Italy Lira</option>
                          <option value="JMD">Jamaica Dollars</option>
                        <option value="JPY">Japan Yen</option>
                      <option value="JOD">Jordan Dinar</option>
                    <option value="KRW">Korea (South) Won</option>
                      <option value="LBP">Lebanon Pounds</option>
                        <option value="LUF">Luxembourg Francs</option>
                            <option value="MYR">Malaysia Ringgit</option>
                              <option value="MXP">Mexico Pesos</option>
                                <option value="NLG">Netherlands Guilders</option>
                                   <option value="NZD">New Zealand Dollars</option>
                                      <option value="NOK">Norway Kroner</option>
                                  <option value="PKR">Pakistan Rupees</option>
                                <option value="XPD">Palladium Ounces</option>
                              <option value="PHP">Philippines Pesos</option>
                           <option value="XPT">Platinum Ounces</option>
                        <option value="PLZ">Poland Zloty</option>
                       <option value="PTE">Portugal Escudo</option>
                    <option value="ROL">Romania Leu</option>
                  <option value="RUR">Russia Rubles</option>
                    <option value="SAR">Saudi Arabia Riyal</option>
                       <option value="XAG">Silver Ounces</option>
                         <option value="SGD">Singapore Dollars</option>
                            <option value="SKK">Slovakia Koruna</option>
                              <option value="ZAR">South Africa Rand</option>
                                <option value="KRW">South Korea Won</option>
                               <option value="ESP">Spain Pesetas</option>
                              <option value="XDR">Special Drawing Right (IMF)</option>
                            <option value="SDD">Sudan Dinar</option>
                          <option value="SEK">Sweden Krona</option>
                       <option value="CHF">Switzerland Francs</option>
                    <option value="TWD">Taiwan Dollars</option>
                  <option value="THB">Thailand Baht</option>
                     <option value="TTD">Trinidad and Tobago Dollars</option>
                        <option value="TRL">Turkey Lira</option>
                         <option value="VEB">Venezuela Bolivar</option>
                           <option value="ZMK">Zambia Kwacha</option>
                            <option value="EUR">Euro</option>
                              <option value="XCD">Eastern Caribbean Dollars</option>
                            <option value="XDR">Special Drawing Right (IMF)</option>
                          <option value="XAG">Silver Ounces</option>
                        <option value="XAU">Gold Ounces</option>
                     <option value="XPD">Palladium Ounces</option>
                  <option value="XPT">Platinum Ounces</option>
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Label md={12}>Pipeline</Label>
                        <Col md={12}>
                        <select className="form-control form-control-sm">
                            <option >pipeline</option>
                        </select>
                       
                        </Col>
                    </Row>
                    <Row>
                        <Label style={{display:"flex"}} md={12}>Pipeline Stage <h6 className="mt-auto mb-auto text-danger">(* mandatory)</h6></Label>
                        <Col md={12} >
                          <select style={{fontStyle:"bold"}} value={type} onChange={handleChange('type')}
                             className="form-control form-control-sm border border-success ">
                           
                            <option selected value="Qualified">Qualified</option>
                            <option value="Contact Made"> Contact Made</option>
                            <option value="Meeting Arranged">Meeting Arranged </option>
                            <option value="Needs Defined"> Needs Defined</option>
                            <option value="Proposal Made"> Proposal Made</option>
                            <option value="Negotiation Started"> Negotiation Started</option>
                            

                            
                        </select>
                </Col>
                    </Row>
                    
                    <Row>
                      
                        <Label md={12}>Expected Close Date</Label>
                        <Col>
                        <Input type="date" md={12}  className=" form-control form-control-sm" value={enddate} onChange={handleChange('enddate')}/>
                        </Col>
                    </Row><Row>
                        <Label md={12}>Owner</Label>
                        <Col md={12}>
                       <select value={dealuser} className="form-control form-control-sm" onChange={handleChange('dealuser')}>
                           <option>{name}</option>
                       </select>
                        </Col>
                    </Row>

                    
                </Card>

                <Card className= "col-sm-6 border-0">
                   <Label style={{fontSize:"12px"}} ><FontAwesomeIcon icon={faUser}/> person____________________________________________</Label> 
                   <Row>
                        <Label md={12}>Phone</Label>
                        <Col>
                        <Input md={12} type="number" className=" form-control form-control-sm" value={phone} onChange={handleChange('phone')}/>
                        </Col>
                    </Row>
                    <Row>
                        <Label md={12}>Email</Label>
                        <Col>
                        <Input md={12} type="email" placeholder="xyz@gmail.com" className=" form-control form-control-sm" value={email} onChange={handleChange('email')}/>
                        </Col>
                    </Row>
                </Card>
            </CardGroup>
         
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={toggle} onClick={onSubmit}>Save</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
  }
  return(
    <div style={{minWidth:"1000px",height:"100%",minHeight:"100%",backgroundColor:"rgb(247, 247, 247)"}}>
      {uppernav()}
      {belownav()}
      <>
      {loading === false ? (
      <div className="card-group  " >
            <div className="flexbox ">
            <Board id="board-1" className="board " >
                <h5 className="border borderop  p-2">Qualified</h5>
                
                    {data.map((qualified,index)=>{
                     
                      return(
                        <div>
                        
                        {!qualified.Lose.includes(qualified._id)&&!qualified.Win.includes(qualified._id)&&(
                         
                        <Link style={{textDecoration:"none"}} to={"/deals/"+qualified._id+"/"+user._id}>
                         <Movingcard id={qualified._id} className="card bg-white" draggable="true">    
                       
                          <ul className="list-unstyled m-0 p-0" key={index}>
                            <li style={{fontWeight:"bold" ,fontSize:"14px",color:"black"}}>{qualified.title}</li>
                            <li style={{fontWeight:"normal",fontSize:"10px",color:"grey"}}>{qualified.organization}</li>
                            <li style={{fontWeight:"bold",color:"grey",fontSize:"12px"}}><PersonIcon/>{qualified.currency}.{qualified.value}</li>
                          </ul>
                    
                         </Movingcard>
                         </Link>
                        )}
                        </div>
                      )
                    })}
               
            </Board>
            <Board id="board-2" className="board ">
            <h5 className="border p-2 border-left-0  borderop ">Contact Made</h5>
          
                    {contact.map(task=>{
                      return(
                       <div>
                         
                         {!task.Lose.includes(task._id)&&!task.Win.includes(task._id)&&(
                         <Link style={{textDecoration:"none"}} to={"/deals/"+task._id+"/"+user._id}>
                        <Movingcard id={task._id} className="card bg-white" draggable="true">
                        <div className="m-0 p-0">
                     
                          <ul className="list-unstyled m-0 p-0">
                            <li style={{fontWeight:"bold" ,fontSize:"14px",color:"black"}}>{task.title}</li>
                            <li style={{fontWeight:"normal",fontSize:"10px",color:"grey"}}>{task.organization}</li>
                            <li style={{fontWeight:"bold",color:"grey",fontSize:"12px"}}><PersonIcon/>{task.currency}.{task.value}</li>
                          </ul>
                        </div>
                        </Movingcard>
                        </Link> 
                    )}
                        
                        </div>
                      )
                    })}


            </Board>
            <Board id="board-3" className="board ">
            <h5 className="border p-2  border-left-0 borderop ">Meeting Arranged</h5>
            {meeting.map(task=>{
                      return(
                        <div>
                        {!task.Lose.includes(task._id)&&!task.Win.includes(task._id)&&(
                        <Link style={{textDecoration:"none"}} to={"/deals/"+task._id+"/"+user._id}>
                        <Movingcard id={task._id} className="card bg-white" draggable="true">
                        <div className="m-0 p-0">
                          <ul className="list-unstyled m-0 p-0">
                            <li style={{fontWeight:"bold" ,fontSize:"14px",color:"black"}}>{task.title}</li>
                            <li style={{fontWeight:"normal",fontSize:"10px",color:"grey"}}>{task.organization}</li>
                            <li style={{fontWeight:"bold",color:"grey",fontSize:"12px"}}><PersonIcon/>{task.currency}.{task.value}</li>
                          </ul>
                        </div>
                        </Movingcard>
                        </Link>
                        )}
                        </div>
                      )
                    })}


            </Board>

       


             
             <Board id="board-5" className="board ">
             <h5 className="border p-2  border-left-0 borderop">Proposal Made</h5>
             {proposal.map(task=>{
                      return(
                        <div>
                        {!task.Lose.includes(task._id)&&!task.Win.includes(task._id)&&(
                        <Link style={{textDecoration:"none"}} to={"/deals/"+task._id+"/"+user._id}>
                        <Movingcard id={task._id} className="card bg-white" draggable="true">
                        <div className="m-0 p-0">
                          <ul className="list-unstyled m-0 p-0">
                            <li style={{fontWeight:"bold" ,fontSize:"14px",color:"black"}}>{task.title}</li>
                            <li style={{fontWeight:"normal",fontSize:"10px",color:"grey"}}>{task.organization}</li>
                            <li style={{fontWeight:"bold",color:"grey",fontSize:"12px"}}><PersonIcon/>{task.currency}.{task.value}</li>
                          </ul>
                        </div>
                        </Movingcard>
                        </Link>
                        )}
                        </div>
                      )
                    })}

            

             </Board>

             <Board id="board-6" className="board">
             <h5 className="border p-2  border-left-0 borderop">Negotiation Started</h5>
             {negotiation.map(task=>{
                      return(
                        <div>
                        {!task.Lose.includes(task._id)&&!task.Win.includes(task._id)&&(
                        <Link style={{textDecoration:"none"}} to={"/deals/"+task._id+"/"+user._id}>
                        <Movingcard id={task.id} className="card bg-white" draggable="true">

                        <div className="m-0 p-0">
                          <ul className="list-unstyled m-0 p-0">
                            <li style={{fontWeight:"bold" ,fontSize:"14px",color:"black"}}>{task.title}</li>
                            <li style={{fontWeight:"normal",fontSize:"10px",color:"grey"}}>{task.organization}</li>
                            <li style={{fontWeight:"bold",color:"grey",fontSize:"12px"}}><PersonIcon/>{task.currency}.{task.value}</li>
                          </ul>
                        </div>
                        </Movingcard>
                        </Link>
                        )}
                        </div>
                      )
                    })}


             </Board>
            
            
            

           
            </div>
            </div>
             ):(
              <div className=" col-md-12 text-center " style={{position:"fixed",marginTop:"14%"}} >
              <ClimbingBoxLoader color="green" />
              </div>
            )}
            </>
        
    </div>

  )
}

export default ModalExample;