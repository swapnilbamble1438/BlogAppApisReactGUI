import React, { useState } from 'react'
import UserContext from './UserContext'
import { useEffect } from 'react'
import { getCurrentUserDetails, isLoggedIn } from '../auth/UserLoginLogout'

const UserProvider=({children})=> {

        const [user,setUser]= useState({})

        const [login,setLogin] = useState(false);

        const [appName,setAppName] = useState({
          name:''
        });

        useEffect(()=>{

          
          setUser(getCurrentUserDetails());
          setLogin(isLoggedIn());
          setAppName({
            name:'BlogApp'
          })

        },[])

        return (
          <UserContext.Provider value={{user,login,appName,setAppName}}>
              {children}
          </UserContext.Provider>
        )
}

export default UserProvider
