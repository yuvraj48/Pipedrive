import React, { useState } from 'react';
import {Row,Col,Form, Button } from 'reactstrap';
import {Link,Redirect} from 'react-router-dom'
import "./sign.css"
import Footer from '../Home/Footer'
import { isAutheticated ,authenticate,signin} from './Helper';



const SignIn=()=>{
    const [values,setValues] = useState({
        email:"",
        password:"",
        error:"",
        didRedirect:false
    });
    const {email,password,didRedirect,error} =values
    const {user}= isAutheticated

    const handleChange = name => event=>{
        setValues({...values,error:false,[name]:event.target.value});
    };
 
    const onSubmit =event =>{
        event.preventDefault();
        setValues({...values,error:false,loading:true})
        signin({email,password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,loading:false})
            }
            else{
                authenticate(data,()=>{
                    setValues({...values,didRedirect:true});
                });
            }
        })
        .catch((error)=>console.log("sign in request failed"))
    };
const performRedirect = () => {
    if (didRedirect) {
      if (user&&user.role === 1) {
        return <Redirect to="/deals"/>
      } else {
        return <Redirect to="/deals"/>
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/" />;
    }
  };

  
    
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-12 offset-sm-3 text-left ml-auto mr-auto" style={{fontSize:"12px"}}>
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };


    const SignInForm =()=>{
        return(
            <div className ="container col-12  ">
            <Form>
              {errorMessage()}
            
                <Row className="form-group">
                    <Col md={11} xs={8} className="ml-auto mr-auto">
                      <input id="input" type="text" placeholder="&#xf003; " onChange={handleChange("email")} value={email} required />
                      <label for="input" alt="Email" placeholder="Email"></label>  
                    </Col>
                </Row>

                <Row className="form-group">
                    <Col md={11}  xs={8} className="ml-auto mr-auto">
                      <input id="input" type="text" placeholder="&#xf023; " value={password} onChange={handleChange("password")}  required />
                      <label for="input" alt=" Password" placeholder=" Password"></label>  
                    </Col>
               </Row>
              
               <Row className="form-group"> 
                   <Col md={10} xs={6}  className=" ml-auto mr-auto" >
                       <Button className="btn btn-block btn-success font-weight-bolder " onClick={onSubmit}> Log in</Button>
                   </Col>
               </Row>
               <Row className="form-group">
                    <Col md={11}  xs={8} className="ml-auto mr-auto">
                      <input id="input" type="checkbox"   className="text-muted" />
                      <label for="input" className="text-muted ml-1" >Remember me</label>  
                    </Col>
               </Row>
                  
               <Row className="form-group" >
                    <Col md={6} sm={10} xs={12} className=" mb-5 mt-3 ml-auto mr-auto  ">
                       <Link to='./signup' md={12} className="text-secondary  text-decoration-none " >Don't have an account ?</Link>
                        
                    </Col>
               </Row>
               
            </Form>
        </div>
        )
    };
   

    return(
                
      <div>
            <div className="container col-12 col-md-4 col-sm-12 border mt-5 mb-5 bg-light ">                          
               <Row  className="form-group ml-auto mr-auto mt-5 ">                 
                   <Col md={12} xs={12} sm={4} className=" ml-auto mr-auto  " >                      
                      <h2 className=" text-center font-weight-bolder mb-3"> LOG IN </h2>
                    </Col>           
                </Row>        

                {SignInForm()}
                {performRedirect()} 
                


           </div>
           {Footer()} 
           </div>
        
      
    )
}



 
export default SignIn;