
import React, { useState ,useEffect} from 'react'
import { Card ,CardBody,CardGroup, CardHeader} from 'reactstrap'
import { isAutheticated } from '../SignC/Helper';
import PieChartIcon from '@material-ui/icons/PieChart'; 
import { getActivitys } from '../ActivityC/Activityhelper';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { getallproduct } from '../Product/producthelper';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import { Avatar } from '@material-ui/core';
import MonetizationOnIcon from "@material-ui/icons/SearchOutlined";

function Insight() {

    const [data,setData]=useState([]);
    const [activitys,setActivitys]=useState([]);
    const [products,setProducts]=useState([]);
    const [userDetails,setUserDetails] = useState([]);
    const [search,setSearch] = useState('');
  
    const {
        user: { name}
      } = isAutheticated();
      const {user,token}=isAutheticated();
      
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

    
  const onTextChanged=event=>{
    const value=event.target.value;
    
    if(value.length>0){
      fetchDeals(value)
    }
    else{
      fetchDeals(null)
    }
  
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
        
        useEffect(()=>{
            loadallActivity()
          },[]);

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


    useEffect(() => {
      fetch(`/deal/${user._id}`,{
          headers:{
              "Content-type":"application/json",  
              Authorization:`Bearer ${token}`           
          }
      }).then(res=>res.json())
      .then(result=>{    
       
        setData(result)
      })
      
    }, []);


    const uppernav =()=>{
        return(
              <div className="border bg-white  "  >
                <div className=" pt-2 pb-1  container-fluid mt-auto mb-auto " style={{display:"flex"}}>
                  <div className="mt-auto mb-auto">
                    <h5>Insights</h5>
                  </div>
                 
                  <div className="container " style={{marginLeft:"5%"}}>
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
    
    return (
        
        <div  style={{minWidth:"1058px",maxWidth:"auto",height:"100%",minHeight:"100%"}}>
            {uppernav()}
            <div className="container mt-5">
            <CardGroup>
                <Card className="ml-3 mr-3 border">
                    <CardHeader>Total Deals You Started Till Now</CardHeader>
                    <CardBody  style={{height:"260px"}}>
                        <div className="text-center pt-4" style={{display:"flex"}}>
                            <h6 className="mt-auto mb-auto pl-4 pr-2">{name}</h6><PieChartIcon style={{fontSize:"140px",color:"lightblue"}}/> 
                            <h6 className="mt-auto mb-auto pl-2 pr-3">{data.length}</h6></div>
                   

                    </CardBody>

                </Card>
                <Card className="ml-3 mr-3 border">
                    <CardHeader>Total Activities</CardHeader>
                    <CardBody  style={{height:"260px"}}>
                        <div className="text-center pt-4" style={{display:"flex"}}>
                            <h6 className="mt-auto mb-auto pl-4 pr-2">{name}</h6><DonutLargeIcon style={{fontSize:"140px",color:"orange"}}/> 
                            <h6 className="mt-auto mb-auto pl-2 pr-3">{activitys.length}</h6></div>
                   

                    </CardBody>
                </Card>
                <Card className="ml-3 mr-3 border">
                    <CardHeader>Total Products</CardHeader>
                    <CardBody  style={{height:"260px"}}>
                        <div className="text-center pt-4" style={{display:"flex"}}>
                            <h6 className="mt-auto mb-auto pl-4 pr-2">{name}</h6><BubbleChartIcon style={{fontSize:"140px",color:"lightblue"}}/> 
                            <h6 className="mt-auto mb-auto pl-2 pr-3">{products.length}</h6></div>
                   

                    </CardBody>
                </Card>
            </CardGroup>
            
            </div>
        </div>
    )
}


export default Insight;
