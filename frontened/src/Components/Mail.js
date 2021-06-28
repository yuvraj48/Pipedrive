import React, {  useState ,useEffect} from 'react'
import { Col, Form, Row , Button, Modal,ModalBody,ModalFooter, Card, CardBody, CardHeader} from 'reactstrap'
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import { Avatar, IconButton } from '@material-ui/core';
import { isAutheticated } from './SignC/Helper';
import { createmail } from './mailhelp';
import {ClimbingBoxLoader} from 'react-spinners'
function Mail() {
    const [inputmodal,setInputmodal]=useState(false)
    const togg=()=>setInputmodal(!inputmodal);
    const [userDetails,setUserDetails] = useState([]);
    const [search,setSearch] = useState('');
    const [mails,setMails]=useState({
      email:"",
      subject:"",
      message:"",
      sent:false,
      error:""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 2600)
      }, []);

    const {email,subject,message}=mails;

    const handleChange=email=>event=>{
      setMails({...mails,error:false,[email]:event.target.value})
    };
    const {
        user: { name}
      } = isAutheticated();
      const {user,token}=isAutheticated();

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


     const onSubmit=event=>{
      event.preventDefault();
    setMails({...mails,error:false})
    createmail({email,subject,message})
      .then(data=>{
        if(data&&data.error){
          setMails({...mails,error:data.error,sent:false})
        }
        else{
          setMails({
            email:"",
            subject:"",
            message:"",
            sent:true,
            error:""
          })
        }
    
      });
    };

    
  const uppernav =()=>{
    return(
          <div className="border bg-white  "  >
            <div className=" pt-2 pb-1  container-fluid mt-auto mb-auto " style={{display:"flex"}}>
              <div className="mt-auto mb-auto">
                <h5>Mail</h5>
              </div>
             
              <div className="container " style={{marginLeft:"7%"}}>
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

    const Emailform=()=>{
        return(
          <div style={{display:"flex",minWidth:"1058px"}}>
            <div className=" mt-5 ml-5 " style={{flex:"0.8"}}>
            <Form className=" border bg-white" style={{minHeight:"400px"}}>
               
                <Row >
                    <Col md={12}>
                    <input  style={{minWidth:"auto",minHeight:"40px",outline:"none",border:"0px",boxShadow:'none'}} value={email} onChange={handleChange('email')} className="border-bottom  form-control " placeholder="To:"/>
                    </Col>
                </Row>
                <Row >
                    <Col>
                    <input  style={{minWidth:"auto",minHeight:"40px",outlineColor:'white',border:"0px",overflow:"hidden",boxShadow:"none"}} value={subject} onChange={handleChange('subject')} className="border-bottom form-control " placeholder="Subject"/>
                    </Col>
                </Row>
                <Row >
                    <Col>
                    <textarea rows="4" cols="50"  style={{minWidth:"auto",outline:"none",paddingBottom:"255px",boxShadow:"none"}} className="border-0 pt-2  form-control" value={message} onChange={handleChange('message')} placeholder="Message"/>
                    </Col>
                </Row>

                <Row style={{marginBottom:"0px"}} className="p-0 mb-0">
                  <Col className=" text-decoration-none ">
                    <Button className="ml-3" size="sm" color="success" type='submit' onClick={onSubmit}>Send</Button>
                  </Col>
                </Row>
            </Form>
            </div>
            <div className="mt-5 ml-md-5 " style={{flex:"0.15"}}>
              <Card style={{}}>
                <CardHeader style={{color:"purple"}}>Link to a deal</CardHeader>
                <CardBody>
                <Button href="/deals" color="success">Add a New Deal</Button>
                </CardBody>
              </Card>
            </div>
            </div>
        )
    }
    return (
      <div style={{minWidth:"100%",maxWidth:"auto",height:"100%",minHeight:"100%",backgroundColor:"rgb(247, 247, 247)",position:"fixed"}}>
            {uppernav()}
            <>
           {loading === false ? (
             <div>  {Emailform()}</div>
          
            ):(
              <div className=" col-md-12 text-center " style={{position:"fixed",marginTop:"17%"}} >
              <ClimbingBoxLoader color="green" />
              </div>
            )}
            </>
        

        </div>
    )
}

export default Mail
