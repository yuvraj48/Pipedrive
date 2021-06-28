import React, { useState,useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CardGroup ,Card,Row,Col, Label,Input,Table} from 'reactstrap';
import { faUser} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {createLead} from "./LeadHelper";
import { isAutheticated } from '../SignC/Helper';
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import { Avatar, IconButton } from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import { createdeal } from '../DealC/DealHelper';
const moment = require("moment");


function Lead() {
    const [leads,setLeads]=useState({
        contactperson:"",
        organisation:"",
        titles:"",
        amount:"",
        curency:"",
        labels:"",
        leaduser:"",
        phone:"",
        email:"",
        success:false,
        error:""
    
      });
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
    
      });

      const onSubmitDeal=event=>{
        event.preventDefault();
        setDeals({...deals,error:false})
        createdeal(user._id,token,{person,type,organization,title,value,currency,enddate,dealuser})
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
              success:true,
              error:""
            })
          }
          window.location.reload();
        });
      };
      
  const {person,type,organization,title,value,currency,enddate,dealuser} = deals;

  const onDealChange=person=>event=>{
    setDeals({...deals,error:false,[person]:event.target.value})
  };
    
    const [userDetails,setUserDetails] = useState([]);
    const [search,setSearch] = useState('');
    const [modal, setModal] = useState(false); 
    const toggle = () => setModal(!modal);  
    const [dealmodal,setDealmodal]=useState(false)
    const togg=()=>setDealmodal(!dealmodal);
    const [data,setData]=useState([]);


  useEffect(() => {
    fetch(`/leads/${user._id}`,{
        headers:{
            "Content-type":"application/json",  
            Authorization:`Bearer ${token}`           
        }
    }).then(res=>res.json())
    .then(result=>{   
       
      setData(result)
    })
    
  }, []);

  useEffect(() => {
    fetch(`/leads/${user._id}`,{
        headers:{
            "Content-type":"application/json",  
            Authorization:`Bearer ${token}`           
        }
    }).then(res=>res.json())
    .then(result=>{    
      result.map(item=>{
        return(
          setDeals({
            ...deals,
            person:item&&item.contactperson,
            type:"",
            organization:item&&item.organisation,
            title:item&&item.titles,
            value:item&&item.amount,
            currency:item&&item.curency,
            enddate:"",
            dealuser:"",
            error:"",
            success:true

          })
        )
      })
     
    })
    
  }, []);


  const deletePost=(leadId)=>{
    fetch(`/leads/${leadId}/${user._id}`,{
        method:"delete",
        headers:{
            "Content-type":"application/json",
            Authorization:`Bearer ${token}`
        }

    }).then(res=>res.json())
    .then(result=>{
    
    
        setLeads(result);
        window.location.reload();
    })
};
      
      
  const {contactperson,organisation,titles,amount,curency,labels,leaduser,phone,email} = leads;
  const {
    user: { name}
  } = isAutheticated();
  const {user,token}=isAutheticated();

//onchange
  const handleChange=contactperson=>event=>{
    setLeads({...leads,error:false,[contactperson]:event.target.value})
  };

//onsubmit
  const onSubmit=event=>{
    event.preventDefault();
    setLeads({...leads,error:false})
    createLead(user._id,token,{contactperson,organisation,titles,amount,curency,labels,leaduser,phone,email})
    .then(data=>{
      if(data&&data.error){
        setLeads({...leads,error:data.error,success:false})
      }
      else{
        setLeads({
          contactperson:"",
          organisation:"",
          titles:"",
          amount:"",
          curency,
          labels:"",
          leaduser:"",
          phone:"",
          email:"",
          success:true,
          error:""
        })
      }
      window.location.reload();
    });
  };

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

   
 const Converttodeal=(id)=>{
  fetch(`/convert/${user._id}`,{
      method:"put",
      headers:{
          "Content-type":"application/json",
           Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        leadId:id
      })
  }).then(res=>res.json())
 

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


  const uppernav =()=>{
    return(
          <div className="border bg-white  "  >
            <div className=" pt-2 pb-1  container-fluid mt-auto mb-auto " style={{display:"flex"}}>
              <div className="mt-auto mb-auto">
                <h5>Leads</h5>
              </div>
             
              <div className="container " style={{marginLeft:"7%"}}>
                <div className="sidebar_search ml-auto mr-auto" style={{maxWidth:"40%",minWidth:"40%",background:"none"}}>
                  <div className="sidebar_searchContainer">
                    <SearchOutlined/>
                    <form  style={{width:"100%"}}>
                    <input placeholder="Search pipeline"  value={search}      onChange={onTextChanged}    className="form-control border-0" style={{minWidth:"100%",boxShadow:'none'}} />
                     
              
                     {userDetails.map(item=>{
                       return(
                        <ul className="listbox">
                          <li classname="mb-1" style={{backgroundColor:"white",cursor: "pointer"}}><div className="border p-2" style={{display:'flex'}}>
                            <MonetizationOnIcon />
                            <div className="ml-3">
                              <h6 className="m-0">{item.title}</h6>
                              <p className="p-0 m-0 text-secondary" style={{fontSize:'12px'}}>{item.currency} {item.value} . {item.person} . {item.organization}</p>

                            </div>
                            
                            
                            </div></li>
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
     };



    
  const leadForm=()=>{
    return (
      <div className="p-2">
        <Button size="sm" color="success" style={{fontWeight:"bold"}} className="ml-3 mt-2" onClick={toggle}>Add Lead</Button>
        <Modal size="lg" style={{maxWidth: '680px',marginTop:"0px"}} isOpen={modal} toggle={toggle}  >
          <ModalHeader toggle={toggle} >Modal title</ModalHeader>
          <ModalBody>
              <CardGroup  className="border-0">
                  <Card className="col-md-6 border-top-0 border-bottom-0 border-left-0 ">
                      <Row>
                          <Label md={12}>Contact Person</Label>
                          <Col>
                          <Input md={12} type="tex" placeholder="&#xf007;"  required className=" form-control form-control-sm" value={contactperson} onChange={handleChange('contactperson')}/>
                          </Col>
                      </Row>
                      <Row>
                          <Label md={12}>Organisation</Label>
                          <Col>
                          <Input type="tex" md={12}  className=" form-control form-control-sm" placeholder="&#xf0f7;"  required  value={organisation} onChange={handleChange('organisation')}/>
                          </Col>
                      </Row>
                      <Row>
                          <Label md={12}>Title</Label>
                          <Col>
                          <Input md={12} type="tex" className=" form-control form-control-sm" value={titles} onChange={handleChange('titles')}/>
                          </Col>
                      </Row>
                      <Row>
                          <Label md={12}>Value</Label>
                          <Col md={6}>
                          <Input md={12} value={amount} onChange={handleChange('amount')} type="tex" className=" form-control form-control-sm"/>
                          </Col>
                          <Col md={4}>
                              <select className="border rounded form-control form-control-sm" style={{width:"120px"}} value={curency} onChange={handleChange('curency')}> 
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
                        <Label md={12}>Labels</Label>
                        <Col md={12}>
                        <select className="form-control form-control-sm" onChange={handleChange('labels')}>
                            <option value="Hot">Hot</option>
                            <option value="Warm">Warm</option>
                            <option value="Cold">Cold</option>
                        </select>
                       
                        </Col>
                    </Row>
              
                      <Row>
                          <Label md={12}>Owner</Label>
                          <Col md={12}>
                         <select value={leaduser} className="form-control" onChange={handleChange('leaduser')}>
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
    };
  


    const dealForm=()=>{
      return (
        <div className="p-2">
          <Modal size="lg" style={{maxWidth: '680px',marginTop:"0px"}} isOpen={dealmodal}   >
            <ModalHeader >Add Deals</ModalHeader>
            <ModalBody>
                <CardGroup  className="border-0">
                    <Card className="col-md-6 border-top-0 border-bottom-0 border-left-0 ">
                        <Row>
                            <Label md={12}>Contact Person</Label>
                            <Col>
                            <Input md={12} type="tex" placeholder="&#xf007;"  required className=" form-control form-control-sm" value={person} onChange={onDealChange('person')} required/>
                            </Col>
                        </Row>
                        <Row>
                            <Label md={12}>Organisation</Label>
                            <Col>
                            <Input md={12} type="tex" placeholder="&#xf0f7;"  required className=" form-control form-control-sm" value={organization} onChange={onDealChange('organization')}/>
                            </Col>
                        </Row>
                        <Row>
                            <Label md={12}>Title</Label>
                            <Col>
                            <Input md={12} type="tex" className=" form-control form-control-sm" value={title} onChange={onDealChange('title')}/>
                            </Col>
                        </Row>
                        <Row>
                            <Label md={12}>Value</Label>
                            <Col md={6}>
                            <Input md={12} type="tex" className=" form-control form-control-sm"/>
                            </Col>
                            <Col md={4}>
                                <select className="border rounded form-control form-control-sm" style={{width:"120px"}} value={currency} onChange={onDealChange('currency')}> 
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
                              <select style={{fontStyle:"bold"}} value={type} onChange={onDealChange('type')}
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
                            <Input type="date" md={12}  className=" form-control form-control-sm" value={enddate} onChange={onDealChange('enddate')}/>
                            </Col>
                        </Row><Row>
                            <Label md={12}>Owner</Label>
                            <Col md={12}>
                           <select value={dealuser} className="form-control form-control-sm" onChange={onDealChange('dealuser')}>
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
                            <Input md={12} type="number" className=" form-control form-control-sm" value={phone} onChange={onDealChange('phone')} disabled/>
                            </Col>
                        </Row>
                        <Row>
                            <Label md={12}>Email</Label>
                            <Col>
                            <Input md={12} type="email" placeholder="xyz@gmail.com" className=" form-control form-control-sm" value={email} onChange={onDealChange('email')} disabled/>
                            </Col>
                        </Row>
                    </Card>
                </CardGroup>
             
            </ModalBody>
            <ModalFooter>
           
                  <Button color="success" onClick={togg} onClick={onSubmitDeal} >Save</Button>

            </ModalFooter>
          </Modal>
        </div>
      );
      };
    

  const leadsdata=()=>{
    return(
      <div>
        {data&&data.length>0?(
         <Table size="sm"  className="bg-white" >
        <thead>
          <tr className="text-muted">
          <th className="pl-4">Title</th>
          <th >Organization</th>
          <th>Label</th>
          <th >Contact Person</th>
          <th>created</th>
          <th>Owner</th>
          <th>Delete</th>
          
          
          </tr>
        </thead>
        <tbody >
    
          {data.map((lead,index)=>{
            return(
             <>
             {!lead.leadconversion.includes(lead._id)?(
              <tr key={index}>
          
                    
        
                <td className="pl-4">{lead.titles}</td>
                <td>{lead.organisation}</td>
                <td className="m-0 p-0 mt-auto">{lead.labels=="Warm"?<h6 className="ml-1 mt-1  p-1"><span className="border rounded ml-0 p-1 " style={{fontSize:"9px",background:"#fc0",color:"#26292c" ,fontWeight:"bold"}}>WARM</span></h6>:lead.label=="Hot"?<h6 className="ml-1 mt-1"><span className="border rounded ml-0 p-1 " style={{fontSize:"9px",background:"#f94839",color:"white" ,fontWeight:"bold"}}>Hot</span></h6>:lead.labels=="Cold"?<h6 className="ml-1 mt-1"><span className="border rounded ml-0 p-1 " style={{fontSize:"9px",background:"#317ae2",color:"white" ,fontWeight:"bold"}}>COLD</span></h6>:<h6></h6>}</td>
                <td className="pl-4">{lead.contactperson}</td>
                <td style={{color:"grey",fontSize:"13px"}}> {moment(lead.createdAt).startOf().fromNow()}</ td>
                <td>{name}</td>
                <td><button
                    onClick={() => {
                      deletePost(lead._id);
                    }}
                    className="btn btn-sm bg-white text-danger border-0 btn-danger"
                  >
                    <DeleteIcon/>
                  </button></td>
                <td><button className="btn btn-sm" type="button"  data-bs-toggle="tooltip" data-bs-placement="bottom" onClick={()=>{togg();Converttodeal(lead._id)}}  title="convert to deal"><MoreHorizIcon/></button></td>

              
            
              </tr>
              ):(
                <tr></tr>
              )}
              </>
              
            )
          })} 
           
          
         
        
        </tbody>
      </Table>
      ):(
        <div className=" container text-center mt-5">
           <img className=" mt-5 " src={process.env.PUBLIC_URL + "/Leads.png"} width="40%" minWidth="40%" alt="Loading..."/>  
        </div>

      )}
      </div>
    )
  }
    return (
      <div style={{minWidth:"1000px",height:"100%",minHeight:"100%",backgroundColor:"rgb(247, 247, 247)"}}>
          {uppernav()}
          {leadForm()}
          {dealForm()}
          {leadsdata()}
            
        </div>
    )
}

export default Lead
