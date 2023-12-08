import React from 'react'
import Base from '../../Base'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardFooter, Container, Form, Input, Table } from 'reactstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import { loadActiveUser, updateUserDetails } from '../../../services/UserService';
import { toast } from 'react-toastify';

const UpdateProfile=() =>{


const {userId} = useParams();
const navigate = useNavigate();

const [user,setUser] = useState({});

useEffect(()=>{


  loadActiveUser(userId).then(response=>
    {
    setUser(response);
    console.log(response);
    });



},[])


  const userChange = (event,property) =>{
    setUser({...user,[property]:event.target.value});
  }

  const updateUser =(event)=>{
    event.preventDefault();

    console.log(user);
    console.log("password: " + user.password);

    if(user.name.trim() == '')
    {
        toast.error("Name is required")
        return;
    }
    if(user.email.trim() == '')
    {
      toast.error("Email is required")
      return;
    }
      updateUserDetails(user,user.id).then(response =>{

        toast.success("User Details updated successfully...");
        navigate("/private/profileinfo");

      }).catch((error)=>{
        console.log(error);
        toast.error("Failed to update User Details," + error.response.data.message);
        console.log(error.response.data.message);
      })


  }

  return (
    <Base>
    
    <Card className='mt-2 bordere-0 rounded-0 shadow-sm'>
        <CardBody>
          <Form onSubmit={updateUser}>
          <h3 className='text-uppercase'>User Information</h3>
          <Container className='text-center'>
            <img src={require('./images/user.png')} alt="user profile picture" className='img-fluid rounder-circle'
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
                <Input type="text" id="name" name="name"
                onChange={e=>userChange(e,'name')}
                 value={user.name}  />
                </td>
              </tr>
              <tr>
                <td>
                  User Email
                </td>
                <td>
                <Input type="email" id="email" name="email"
                onChange={e=>userChange(e,'email')}
                 value={user.email}  />
                </td>
              </tr>

              <tr>
                <td>
                  About
                </td>
                <td>
                <Input type="text" id="about" name="about"
                onChange={e=>userChange(e,'about')}
                 value={user.about}  />
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

         

            <CardFooter className='text-center'>
                      <Button type="submit" className='rounded-0' color="warning">Save</Button>
                      <Button className='rounded-0 ms-2' tag={Link} to={`/private/profileinfo`}   color="danger">Cancel</Button>

            </CardFooter>
        </Form>
        </CardBody>
        {JSON.stringify(user)}
      </Card>

    
    </Base>
  )
}

export default UpdateProfile