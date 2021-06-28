import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return(
    <div className="footer bg-light p-5">
        
            <div className="col-12  mt-5" >             
            
                
                <div className="col-12 col-sm-4 ml-auto">
                   
                    <div className="text-center">
                        <a className="btn btn-social-icon btn-lg btn-google text-secondary" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                        <a className="btn btn-social-icon btn-facebook btn-lg text-secondary" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                        <a className="btn btn-social-icon btn-linkedin btn-lg text-secondary" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                        <a className="btn btn-social-icon btn-twitter btn-lg text-secondary" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                        <a className="btn btn-social-icon btn-google btn-lg text-secondary" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                        <a className="btn btn-social-icon btn-lg text-secondary" href="mailto:"><i className="fa fa-envelope-o"></i></a>
                    </div>
                </div>
            
            <div className="row  ml-5 ">             
                <div className="mr-auto ml-md-5">
                    <p>© 2020 pipedrive | Term of service | privacy policy</p>
                </div>
            </div>
        </div>
        </div>
    
    )
}

export default Footer;