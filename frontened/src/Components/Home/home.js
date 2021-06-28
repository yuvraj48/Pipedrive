import React from 'react';
import {Card,CardGroup,CardBody, Button,CardTitle,CardText, CardFooter} from 'reactstrap'
import Footer from "./Footer"


const home=()=>{
 
    const Upper=()=>{
        return(
            <CardGroup className="border-bottom col-12 mt-1 ml-md-3 mr-md-2">
                 <Card className="border-0 mt-3 col-12 col-md-5 mb-5">
                 <div className="  mt-5">
                    <h1 className="size font-weight-bolder">Designed To Keep You Selling</h1>
                    <p >When you need to stay laser-focused on the right deals, Pipedrive is here to support you.</p><br/> 

                    <Button href="/login" className="pl-5 pr-5 btn-lg bg-success font-weight-bold ">Login</Button>
                    <p>Full access ,No credit card required.use now</p>
                </div>
                
                </Card>
            <Card className="border-0 col-12 col-md-6 mt-5 ml-auto mb-5">
            <img  src={process.env.PUBLIC_URL + "/pipedrive.gif"} width="90%" alt="Loading..."/>
            
                
            </Card>
            </CardGroup>
       

        )
    }

    const mid=()=>{
        return(
            <div className="mt-5 ">
                <h1 className="text-center font-weight-bolder">Features to help you focus</h1><br/>
                <p className="text-center">Pipedrive is full of features that help you prioritize deals, track performance and predict revenue</p><br/>
                <CardGroup className="border-0">
                   <Card className="border-top-0 border-left-0 text-center">
                
                     <img className=" ml-auto mr-auto mt-3"  src={process.env.PUBLIC_URL + "/manage.png"} width="30%" alt="Loading..."/>
                     <CardBody className="mb-5">
                       <CardTitle tag="h5" >Manage leads and deals</CardTitle>            
                         <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                         
                     </CardBody>
                   </Card>
                   <Card className="border-top-0 text-center ">
                     <img className=" ml-auto mr-auto" src={process.env.PUBLIC_URL + "/h_s.gif"} width="30%" alt="Loading..."/>  
                     <CardBody className="mb-5">
                       <CardTitle tag="h5">Track communications</CardTitle>            
                         <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                        
                     </CardBody>
                   </Card>
                   <Card className="border-top-0 border-right-0 text-center">
                    <img className=" ml-auto mr-auto mt-3 mb-2" src={process.env.PUBLIC_URL + "/setting.png"} width="22%" alt="Loading..."/>  
                     <CardBody className="mb-5">
                       <CardTitle tag="h5">Automate and Grow</CardTitle>            
                         <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                         
                     </CardBody>
                   </Card>
                </CardGroup>
                <CardGroup className="border-0">
                   <Card className="border-top-0 border-left-0 text-center">
                
                     <img className=" ml-auto mr-auto mt-2"  src={process.env.PUBLIC_URL + "/insight.jpg"} width="50%" alt="Loading..."/>
                     <CardBody  className="mb-5">
                       <CardTitle tag="h5" >Insight and reports</CardTitle>            
                         <CardText>Get more hot leads fed straight into your sales pipelines around the clock from your custom chatbot and web forms</CardText>
                         
                     </CardBody>
                   </Card>
                   <Card className="border-top-0 text-center ">
                     <img className=" ml-auto mr-auto mt-5" src={process.env.PUBLIC_URL + "/security.gif"} width="26%" alt="Loading..."/>  
                     <CardBody  className="mb-5">
                       <CardTitle tag="h5">Privacy and Security</CardTitle>            
                         <CardText>Have full transparency and peace of mind on when and how your business data is being used</CardText>
                     </CardBody>
                   </Card>
                   <Card className="border-top-0 border-right-0 text-center">
                   <img className=" ml-auto mr-auto mt-5" src={process.env.PUBLIC_URL + "/mobile.jpg"} width="26%" alt="Loading..."/>  
                     <CardBody  className="mb-5">
                       <CardTitle tag="h5">Mobile Apps and Integration</CardTitle>            
                         <CardText>Access Pipedrive from your mobile device and integrate with your favorite sales-boosting apps.</CardText>
                         
                     </CardBody>
                   </Card>
                </CardGroup>
            </div>
        )
    }
    const below=()=>{
      return(
          <div className="mt-5 ">
              <h1 className="text-center font-weight-bolder">Expect more from CRM</h1><br/>
              <p className="text-center">The sales tool you can rely on to grow more revenue</p><br/>
              <CardGroup className="border-0 col-11 ml-auto mr-auto">
                   <Card className="border-0 text-center">
                
                     
                     <CardBody className="mb-5  col-10 ml-auto mr-auto">
                       <CardTitle tag="h6" className="text-success " ><i class="fas fa-quote-left"></i></CardTitle>            
                         <CardText className="bg-light text-center text-muted p-5"><h6>Pipedrive mixes features and design that allows our team to streamline our operations. It was very easy to get up and running with Pipedrive compared to SalesForce.</h6></CardText>
                         <CardFooter><h6>Michael Liedtke</h6>
                     Engineering Manager, Escrow.com
                      </CardFooter>
                     </CardBody>
                     
                   </Card>
                   <Card className="border-0 text-center">
                
                     
                <CardBody className="mb-5  col-10 ml-auto mr-auto">
                  <CardTitle tag="h6" className="text-success " ><i class="fas fa-quote-left"></i></CardTitle>            
                    <CardText className="bg-light text-center p-5 text-secondary"><h6>The ability to completely customize the data fields and workflow gives me a 
                      tailor made CRM. Much different than my past experiences with these types of programs! The mobile app is just as functional as the desktop version, and even has a few little extras.</h6></CardText>
                    <CardFooter><h6>Chris Wolpert</h6>
                      Managing Member, Group Benefit Solutions

                 </CardFooter>
                </CardBody>
                
              </Card>
              <Card className="border-0 text-center">
                
                     
                <CardBody className="mb-5  col-10 ml-auto mr-auto">
                  <CardTitle tag="h6" className="text-success " ><i class="fas fa-quote-left"></i></CardTitle>            
                    <CardText className="bg-light text-center text-muted p-5"><h6> Pipedrive has been invaluable in helping us keep our clients happy. It's a really intuitive tool that's easy to use and quick to master. Perhaps the most useful feature for us is the flexibility and level of integrations it has. It's not just our CRM, it's part of our whole
                       sales and account management process, so the ability to talk with the other tools we use is critical.</h6></CardText>
                    <CardFooter><h6>Guy Thornton</h6>                                
                       Managing Director, Picked Group Ltd
                               

                 </CardFooter>
                </CardBody>
                
              </Card>
           </CardGroup>
              
               <div className="bg-dark ">
               <h1 className="text-center font-weight-bolder text-white">Join the sales expert</h1><br/>
               <p className="text-center"> <Button href="/login" className="pl-5 col-3 pr-5 btn-lg bg-success font-weight-bold ">Login</Button>
                    <p className="text-white mt-2">Full access ,No credit card required.use now</p></p><br/>
               </div>
               </div>
      )
    }
 
    
    return(
        <div className="bg-white col-12 container " >
            {Upper()}<br/>
            {mid()}<br/>
            {below()}<br/>
            {Footer()}
        </div>
    )
        
    
}
export default home;