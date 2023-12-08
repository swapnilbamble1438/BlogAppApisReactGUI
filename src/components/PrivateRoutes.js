import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from '../auth/UserLoginLogout';

const PrivateRoutes =()=> {

  console.log("User is LoggedIn: ", isLoggedIn());
  
  if(isLoggedIn())
  {
    return <Outlet/>
  }else{
    return <Navigate to={"/login"}/>;
  }
 

  //same code can be written in one line also
// return isLoggedIn() ? <Outlet />: <Navigate to={"/login"}/>
    
}

export default PrivateRoutes