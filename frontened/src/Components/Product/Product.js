import React, { useState,useEffect } from 'react';
import {Row,Col,ModalFooter,Modal,ModalBody,ModalHeader,Button,Input,Label,Card, Table,CardBody} from 'reactstrap'
import { isAutheticated } from '../SignC/Helper';
import { createproduct } from './producthelper';
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import { Avatar } from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import {getallproduct,deleteProduct } from './producthelper';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {ClimbingBoxLoader} from 'react-spinners';
const Products =()=>{
  const [inputmodal,setInputmodal]=useState(false);
  const [products,setProducts]=useState([]);
  const togg=()=>setInputmodal(!inputmodal);
  const [userDetails,setUserDetails] = useState([]);
  const [search,setSearch] = useState('');
  const [modal,setModal]=useState(false)
  const [values,setValues]=useState({
    ProductName:"",
    ProductCode:"",
    Category:"",
    Unit:"",
    UnitPrice:"",
    Tax:"",
    error:"",
    success:false    
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setTimeout(() => setLoading(false), 2600)
    }, []);
 
  const {user,token}=isAutheticated();
  const {
    user: { name}
  } = isAutheticated();
  const toggle=()=>setModal(!modal);
 

  const loadallProduct=()=>{
      getallproduct().then(data=>{
          if(data&&data.error){
              console.log(data.error)
          }
          else{
              setProducts(data);
          }
      });

  };
  useEffect(()=>{
    loadallProduct()
  },[])

  const deletethisProduct=ProductId=>{
    deleteProduct(ProductId,user._id,token).then(data=>{
      if(data.error){
        console.log(data.error);
      }
      else{
        loadallProduct()
      }
    });

  }

  const {ProductName,ProductCode,Category,Unit,UnitPrice,Tax,error,success}=values;

  const handleChange=Name=>event=>{
    setValues({...values,error:false,[Name]:event.target.value})
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


  const uppernav =()=>{
    return(
          <div className="border bg-white  "  >
            <div className=" pt-2 pb-1  container-fluid mt-auto mb-auto " style={{display:"flex"}}>
              <div className="mt-auto mb-auto">
                <h5>Products</h5>
              </div>
             
              <div className="container " style={{}}>
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

   const ProductData = () => {    
      return (
      <>
      {loading === false ? (
        <div>
        {products.length>0?
         <Table size="sm" bordered className="bg-white" >
          <thead>
            <tr>
            <th >ProductName</th>
            <th >ProductCode</th>
            <th >Category</th>
            <th >Unit</th>
            <th>Unit Price</th>
            <th>Tax</th>
            <th>Action</th>
            
            </tr>
          </thead>
          <tbody >
              {products.map((product,index)=>{
                  return(
                    <tr key={index}>
              
                  
                    <td>{product.ProductName}</td>
                    <td>{product.ProductCode}</td>
                    <td>{product.Category}</td>
                    <td>{product.Unit}</td>
                    <td>{product.UnitPrice}</td>
                    <td>{product.tax}</td>
                                    
                    <td> <button
                        onClick={() => {
                          deletethisProduct(product._id);
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
            <h5>No Products Added Yet</h5>
            <p style={{cursor:"pointer",color:"rgb(49, 122, 226)"}} onClick={toggle}>Create a new product</p>
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

  const onSubmit=event=>{
    event.preventDefault();
    createproduct(user._id,token,{ProductName,ProductCode,Category,Unit,UnitPrice,Tax})
    .then(data=>{
      if(data.error){
        setValues({...values,error:data.error,success:false})
      }
      else{
        setValues({
          ...values,
          ProductName:"",
          ProductCode:"",
          Category:"",
          Unit:"",
          UnitPrice:"",
          Tax:"",
          error:"",
          success:true

        })
        
      }
      window.location.reload();
    })
  } 
 

      const personForm=()=>{
        return(
        <div>
          <Button className="btn btn-sm ml-md-3 mt-md-3" style={{fontWeight:"bold"}} color="success" onClick={toggle}>+ Product</Button>
          <Modal style={{width:"350px"}} isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle}>Add Person</ModalHeader>
            <ModalBody>          
              <Row >
                <Label md={12}>Product Name</Label>
                <Col md={12}>
                  <Input type="tex" className="form-control form-control-sm" value={ProductName} onChange= {handleChange("ProductName")}/>
                </Col>
              </Row>
              <Row >
                <Label md={12}>ProductCode</Label>
                <Col md={12}>
                  <Input type="tex" className="form-control form-control-sm" value={ProductCode} onChange={handleChange("ProductCode")}/>
                </Col>
              </Row>
              <Row >
                <Label md={12}>Label</Label>                
               <Col md={12}>
                 <select className="border-secondary" onChange={handleChange("Category")} style={{width:"320px "}}>
                   <option >Category</option>
                   
                 </select>
                </Col>
              </Row>
              <Row >
                <Label md={12}>Unit</Label>
                <Col md={12}>
                  <Input type="tex" className="form-control form-control-sm" value={Unit} onChange={handleChange("Unit")}/>
                </Col>
              </Row>

              <Row >
                <Label md={12}>Unit Price</Label>
                <Col md={12}>
                  <Input type="number" className="form-control form-control-sm" value={UnitPrice} onChange={handleChange("UnitPrice")}/>
                </Col>
              </Row>

              <Row >
                <Label md={12}>% Tax</Label>
                <Col md={12}>
                  <Input type="number" className="form-control form-control-sm" value={Tax} onChange={handleChange("Tax")}/>
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
       
        <div className="mt-md-4 ml-2 mr-2">
        {ProductData()}
  
        </div>
        </div>


    )
}

export default Products;