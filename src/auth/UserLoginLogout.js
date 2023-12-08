


// doLogin=> data=> set to localstorage
export const doLogin=(UserDetailsWithToken,next)=>{
    localStorage.setItem("UserDetailsWithToken", JSON.stringify(UserDetailsWithToken));
    next();
}

// isLoggedIn=>
export const  isLoggedIn=()=>{
    let UserDetailsWithToken = localStorage.getItem("UserDetailsWithToken");
    if(UserDetailsWithToken == null || UserDetailsWithToken == undefined || UserDetailsWithToken == '')
    {
        return false;
    }
    else{
        return true;
    }
}


// doLogout=> remove from localstorage
export const doLogout=(next)=>{
    localStorage.removeItem("UserDetailsWithToken");
    next();
   
}



// get currentUser
export const getCurrentUserDetails=()=>{
    if(isLoggedIn())
    {
       let user = JSON.parse(localStorage.getItem("UserDetailsWithToken"));

       let returndata = ({});
       if(user.user == undefined || user.user == null || user.user == '')
       {
        returndata = user.data.user;
       }
       else if(user.data.user == undefined || user.data.user == null || user.data.user == '')
       {
        returndata = user.user;
       }
       return returndata;

    }else{
        return undefined;
    }
}

// get token
export const getToken=()=>{
    if(isLoggedIn())
    {
       let token = JSON.parse(localStorage.getItem("UserDetailsWithToken"));

       let returndata = ({});
       if(token.token == undefined ||token.token == null || token.token == '')
       {
        returndata = token.data.token;
       }
       else if(token.data.token == undefined || token.data.token == null || token.data.token == '')
       {
        returndata = token.token;
       }
       return returndata;

    }else{
        return undefined;
    }
}