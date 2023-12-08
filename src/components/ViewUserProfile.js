import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Card, CardBody, CardFooter, Container, Table } from 'reactstrap'
import { getCurrentUserDetails, isLoggedIn } from '../auth/UserLoginLogout';
import { Link } from 'react-router-dom'

const ViewUserProfile=({user})=> {

  const [login,setLogin] = useState(false);

 const [loginUser,setLoginUser] = useState({});
  
  useEffect(()=>{

    setLogin(isLoggedIn());

    setLoginUser(getCurrentUserDetails()); 

     
   },[]);
 
 
    return (
        <Card className='mt-2 bordere-0 rounded-0 shadow-sm'>
        <CardBody>
          <h3 className='text-uppercase'>User Information</h3>
          <Container className='text-center'>
            <img src={require('./pages/user_routes/images/user.png')} alt="user profile picture" className='img-fluid rounder-circle'
            style={{maxWidth:'200px', maxHeight:'200px' }}/>
          </Container>

          <Table responsive striped hover bordered={true} className='text-center mt-5'>
            <tbody>
              <tr>
                <td>
                  User ID
                </td>
                <td>
                  {user.id}
                </td>
              </tr>

              <tr>
                <td>
                  User Name
                </td>
                <td>
                  {user.name}
                </td>
              </tr>
              <tr>
                <td>
                  User Email
                </td>
                <td>
                  {user.email}
                </td>
              </tr>

              <tr>
                <td>
                  About
                </td>
                <td>
                  {user.about}
                </td>
              </tr>
              <tr>
                <td>
                User Roles
                </td>
                <td>
                
                {
                  
                 user?.roles?.map(
                    (role) => {
                  return(
                    <div key={role?.id}>{role?.name}</div>
                  )
                    })
                  
                    } 

                  
                  
                </td>
              </tr>
            </tbody>
          </Table>

          { login ? 
          (loginUser.id == user.id)?(

            <CardFooter className='text-center'>
              {/* <Button color='info'>Update Profile</Button> */}
              <Button tag={Link} to={`/private/updateprofile/${user.id}`}  color='info'>Update</Button>

            </CardFooter>
          ): '' : ''
         }
        </CardBody>
      </Card>
  )
}

export default ViewUserProfile