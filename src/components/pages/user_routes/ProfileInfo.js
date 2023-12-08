import React, { useEffect, useState } from 'react';
import Base from "../../Base";
import { getCurrentUserDetails } from '../../../auth/UserLoginLogout';
import {loadActiveUser} from '../../../services/UserService';
import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap';
import ViewUserProfile from '../../ViewUserProfile';

const ProfileInfo=()=> {


 const [loginUser,setLoginUser] = useState({});

  const [user,setUser] = useState({});
 
 useEffect(()=>{

 setLoginUser(getCurrentUserDetails()); 

 loadActiveUser(getCurrentUserDetails().id).then(response=>
  {
  setUser(response);
  console.log(response);
  });

  
},[]);

const userView=()=>{
  return (
    <Row>
      <Col md={{size:6,offset:3}}>
        <ViewUserProfile user={user}/>
      </Col>
    </Row>
  )
}


  return (
    <Base>
    
     { user ? userView() : 'Loading User Data'}

    
    </Base>



  )
}

export default ProfileInfo