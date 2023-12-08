import React, { useEffect, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

import {NavLink as ReactLink, useNavigate} from "react-router-dom";
import { doLogout, getCurrentUserDetails, isLoggedIn } from '../auth/UserLoginLogout';


const CustomNavbar=()=>{

  const navigate = useNavigate();

 const[isOpen,setIsOpen] = useState(false);
 const toggle = () => setIsOpen(!isOpen);

  const [login,setLogin] = useState(false);
  const[user,setUser] = useState({});

  useEffect(()=>{

    setLogin(isLoggedIn());
    // getCurrentUserDetails().then(response=>{
    //   console.log(response);
    // })
   
    setUser(getCurrentUserDetails());
    

  },[]);

  

  const userLogout=()=>{
      doLogout(()=>{
        setLogin(false);
        navigate("/login");
      });
  };

 

  return (

    
    <div>
      <Navbar color="dark" 
      dark
      expand ="md"
      fixed=""
      className='px-4'
      >
        <NavbarBrand tag={ReactLink} to="/">MyBlogs</NavbarBrand>
        <NavbarToggler  onClick={toggle}  />

        <Collapse isOpen={isOpen}  navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/">New Feed</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/services">Services</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Contact Us</DropdownItem>
                <DropdownItem>Help</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Github</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          <Nav navbar>
            {
              login &&  (
            <>
              <NavItem>
                <NavLink tag={ReactLink} to="/private/userdashboard" >User Dashboard</NavLink>
              </NavItem>

              <NavItem>
                <NavLink tag={ReactLink} to="/private/profileinfo" >{user?.email}</NavLink>
              </NavItem>

              <NavItem>
              <NavLink onClick={userLogout} >Logout</NavLink>
              </NavItem>
            </>
              )
            }
            {
            !login &&(
              <>
             <NavItem>
              <NavLink tag={ReactLink} to="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/signup">Signup</NavLink>
            </NavItem>
             
             
              </>
            )
            }
           
          </Nav>


          {/* <NavbarText> Github</NavbarText> */}

        </Collapse>
        
      </Navbar>
    </div>
  );
 

}


export default CustomNavbar;