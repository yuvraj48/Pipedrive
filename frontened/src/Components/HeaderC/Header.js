import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faDotCircle,faDollarSign,faEnvelope,faIdCardAlt,faChartLine,faBox,faCalendarAlt} from '@fortawesome/free-solid-svg-icons'
import {Navbar,Nav,Form,Row,Col,Button,NavbarBrand,NavItem,Modal, ModalHeader, ModalBody,ModalFooter } from 'reactstrap';
import {NavLink, withRouter} from 'react-router-dom';
import "../SignC/sign.css"
import {signup} from '../SignC/Helper'
import {Link,useHistory} from "react-router-dom"
import {signout,isAutheticated} from "../SignC/Helper"
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Header = ()=>{
  let history = useHistory();
  const [values,setValues]=useState({
    name:"",
    email:"",
    password:"",
    companyname:"",
    companysize:"",
    companytype:"",
    phone:"",
    error:"",
    success:""
  });
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
    const {name,email,password,companyname,companytype,companysize,phone,error,success}=values;

    const handleChange=name=>event=>{
      setValues({...values,error:false,[name]:event.target.value});
    };

    const onSubmit=event=>{
      event.preventDefault();
      setValues({...values,error:false});
      signup({name,email,password,companyname,companytype,phone,companysize})
      .then(data=>{
        if(data&&data.error){
          setValues({ ...values, error: data.error, success: false });
        }
        else{
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            companyname:"",
            companysize:"",
            companytype:"",
            phone:"",
            error: "",
            success: true
          });
        }
      });

    };
    const successMessage = () => {
      return (
        <div className="row">
          <div className="col-md-12 text-left">
            <div
              className="alert alert-success"
              style={{ display: success ? "" : "none" }}
            >
              New account was created successfully. Please{" "}
              <Link to="/login">Login Here</Link>
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
  
        return(
          <React.Fragment>
            <div>
            <Navbar className="bg-dark yo sha" style={{minWidth:"1058px"}}>
            <NavbarBrand href="/"  className="Brand font-weight-bold text-white shadow-lg border-light">PIPEDRIVE</NavbarBrand>
            <Nav className="mr-auto">
              

              {isAutheticated()&&(
              <NavItem>
              <NavLink className="nav-link text-white  rounded border-secondary" to="/leads" ><span className="ml-1"><FontAwesomeIcon  icon={faDotCircle}/></span> Leads</NavLink>
              </NavItem>
              )}
              {isAutheticated() &&(
              <NavItem>
              <NavLink className="nav-link text-white rounded border-secondary" to='/deals'><span><FontAwesomeIcon icon={faDollarSign}/></span> Deals</NavLink>
              </NavItem>
              )}
              {isAutheticated() && (
              <NavItem>
              <NavLink className="nav-link text-white rounded border-secondary" to="/mail"><span><FontAwesomeIcon icon={faEnvelope}/></span> Mail</NavLink>
              </NavItem>
              )}

              {isAutheticated() && (
              <NavItem>
              <NavLink className="nav-link text-white  rounded border-secondary" to="/activities"><span><FontAwesomeIcon icon={faCalendarAlt}/></span> Activities</NavLink>
              </NavItem>
              )}

              {isAutheticated()&&(
              <NavItem>
              <NavLink className="nav-link text-white rounded border-secondary" to="/person/list"><span><FontAwesomeIcon icon={faIdCardAlt}/></span> Contact</NavLink>
              </NavItem>
              )}

              {isAutheticated()&&(
              <NavItem>
              <NavLink className="nav-link text-white  rounded border-secondary" to="/products"><span><FontAwesomeIcon icon={faBox}/></span> Products</NavLink>
              </NavItem>
              )}

              {isAutheticated()&&(
              <NavItem>
              <NavLink className="nav-link text-white  rounded border-secondary" to="/insight"><span><FontAwesomeIcon icon={faChartLine}/></span> Insights</NavLink>
              </NavItem>
              )}

            </Nav>
            
            <Nav navbar-right>
            {!isAutheticated() && (
              <NavItem>
                <Button outline onClick={toggle} className="mr-4 text-white font-weight-bold">Try it free </Button>
                
              </NavItem>
              )}
            </Nav>
            

            <Nav navbar-right >
              {!isAutheticated() && (
              
              <NavItem>
                <NavLink  to="/login" className="mr-3 text-light shadow-lg rounded border-secondary">Login</NavLink>
                
              </NavItem>
              )}
            </Nav>
            <Nav navbar-right >
              {isAutheticated() &&(
                 <NavItem>
                 <span
               className="nav-link text-warning shadow rounded border-secondary" style={{cursor:"pointer"}}
               onClick={()=>{
                 signout(()=>{
                   history.push("/login")
                 })
               }}
              
              >signout
              </span>
                 
               </NavItem>

              )}
             
            </Nav>
            
              
               
              
          
          </Navbar>
        
          </div>
           <Modal isOpen={modal} toggle={toggle}  >
           <ModalHeader onClick={toggle}  className="ml-auto mr-auto " ><h3 className="font-weight-bolder ml-5 mr-5 ">SIGN UP</h3><p >We just need  few  details...</p></ModalHeader>
           <ModalBody>
             {successMessage()}
             {errorMessage()}
           <Form>
             <Row className="form-group">              
              <Col >	
               <input id="input" type="text" placeholder="&#xf2c1; " required value={name} onChange={handleChange("name")} />
            	 <label for="input" alt="Name" placeholder="Name"></label>           
              </Col>  
           </Row> 
            <Row className="form-group">
              <Col >	
              <input id="input" type="text" placeholder="&#xf003;"  required value={email} onChange={handleChange("email")}/>
              <label for="input" alt="Email" placeholder="Email"></label>            
            </Col>
            </Row>     
            <Row className="form-group">
             <Col >	
              <input id="input" type="text" placeholder="&#xf0f7;"  required  value={companyname} onChange={handleChange("companyname")}/>
              <label for="input" alt="Company Name" placeholder="Company Name"></label>  


            <FormControl className="form-control form-control-sm">
             <InputLabel  htmlFor="age-native-simple">How Big Is Your Company</InputLabel>
            <Select           
             native
             value={companytype}     
             onChange={handleChange("companysize")}            
            >
               <option hidden aria-label="None" value="" />
             <option value="1">1</option>
             <option value="2-10">2-10</option>
             <option value="11-50">11-50</option>
             <option value="50-100">50-100</option>
             <option value="100-200">100-200</option>
             <option value="200-1000">200-1000</option>
             <option value="1000+">1000+</option>
           </Select>
           </FormControl> 


             <FormControl className="form-control form-control-sm " style={{marginTop:"43px"}}>
             <InputLabel  htmlFor="age-native-simple" >Company Industry</InputLabel>
            <Select           
             native
             value={companytype}
     
             onChange={handleChange("companytype")}
            
            >
               <option hidden aria-label="None" value="" />
             <option value="Software,app development">Software,app development</option>
             <option value="Health">Health</option>
             <option value="Tech Startup">Tech Startup</option>
             <option value="Education and Training"> Education and Training</option>
             <option value="Real Estate">Real Estate</option>
             <option value="Creative agency(web,advertising,video)">Creative agency(web,advertising,video)</option>
             <option value="Financial or Credit Service">Financial or Credit Service</option>
             <option value="News,Media and Publication">News,Media and Publication</option>
             <option value="Manufacturing">Manufacturing</option>
             <option value="It service">It service</option>
             <option value="Consulting">Consulting</option>
             <option value="onstruction">Construction</option>
             <option value="Trade">Trade</option>
             <option value="Other">Other</option>
           </Select>
           </FormControl>    

            
              </Col>
           </Row>

          
           <Row className="form-group mt-5">
             <Col >	
              <input id="input" type="text" placeholder="&#xf10b;" required value={phone} onChange={handleChange("phone")}/>
       	      <label for="input" alt="Phone No." placeholder="Phone No."></label>            
             </Col>
           </Row>
           <Row className="form-group">
            <Col >	
             <input id="input" type="text" placeholder="&#xf023; " value={password} onChange={handleChange("password")} required />
      	     <label for="input" alt="Password" placeholder="Password"></label>            
           </Col>
           </Row>
         </Form>       
           </ModalBody>
           <ModalFooter>
          <Button color="success" onClick={onSubmit}>Continue</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
       </Modal>
       </React.Fragment>
        );
    }
  


export default withRouter(Header);