import {  myAxios, privateAxios } from "./helper";


// add Comment
export const addComment =(comment,postId,userId)=>{

    return privateAxios
    .post( `/api/comment/create/${postId}/${userId}`,comment)
    .then((response) => response.data);
}

// remove Comment
export const removeComment =(commentId)=>{

    return privateAxios
    .delete( `/api/comment/delete/${commentId}`)
    .then((response) => response.data);
}