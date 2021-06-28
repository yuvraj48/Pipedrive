import { faPhoneAlt,faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { isAutheticated } from '../SignC/Helper';
import { getorganisation ,deleteOrganisation} from './ContactHelper';

const OrganisationData = () => {
    const [organisations,setOrganisations]=useState([])
    const { user, token } = isAutheticated();

    const loadallOrganisation=()=>{
        getorganisation().then(data=>{
            if(data&&data.error){
                console.log(data.error);
            }
            else{
                setOrganisations(data);
            }
        });

    };
    useEffect(()=>{
      loadallOrganisation();
    },[]);

    const deletethisOrganisation=organisationId=>{
      deleteOrganisation(organisationId, user._id, token).then(data => {
        if(data.error){
          console.log(data.error);
        }
        else{
          loadallOrganisation()
        }
      });

    }
    const {
      user: { name}
    } = isAutheticated();
    
  
    
  return (
    <Table size="sm" bordered className="bg-white" >
      <thead>
        <tr>
        <th >Name</th>
        <th >Label</th>
        <th >Owner</th>
        <th >Adress</th>
        <th>Actions</th>
        
        </tr>
      </thead>
      <tbody >
          {organisations.map((organisation,index)=>{
              return(
                <tr key={index}>
          
              
                <td>{organisation.Name}</td>
                <td>{organisation.label}</td>
                <td>{name}</td>
                <td>{organisation.Adress}</td>
                
              
                <td> <button
                    onClick={() => {
                      deletethisOrganisation(organisation._id);
                    }}
                    className="btn btn-sm bg-white text-danger border-0 btn-danger"
                  >
                    <FontAwesomeIcon icon={faMinus}/>
                  </button></td>

              </tr>

              )
          })}
        
       
      
      </tbody>
    </Table>
  );
}
export default OrganisationData;