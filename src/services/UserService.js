import { myAxios, privateAxios } from "./helper";



// adding new user
export const signUp = (user) => {

    return myAxios
    .post('/api/register',user)
    .then((response) => response.user);
};


// login user
export const loginUser=(loginDetails)=>{
    return myAxios.post('api/login',loginDetails).then((response)=>response);
}


// get User
export const loadActiveUser= (userId)=>{
   return myAxios.get("/api/user/"+userId).then((response) => response.data);
}

// update User
export const updateUserDetails = (user,userId)=>{
    return privateAxios.put(`/api/user/update2/${userId}`,user).then((response)=>
    response.data);
}

