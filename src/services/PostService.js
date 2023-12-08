import {  myAxios, privateAxios } from "./helper";

// addPost
export const addPost = (post,userId,categoryId) => {

    console.log(userId + " " + categoryId);
    return privateAxios
    .post(`/api/post/${userId}/${categoryId}`,post)
    .then((response) => response.data);
};


// get all posts
export const loadAllPosts=(pageNo,pageSize)=>{
    
    return myAxios.get(`/api/post/getall?pageNo=${pageNo}&pageSize=${pageSize}&sortDir=desc`).then(response=>response.data);
}

// get post by postId
export const loadPostByPostId=(postId)=>{
    return myAxios.get("/api/post/"+postId).then(response=>response.data);
}

// upload post image
export const uploadPostImage=(image,postId)=>{
    let formData = new FormData();
    formData.append("image",image);

    return privateAxios.put(`/api/post/uploadimage/${postId}`,formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then((response)=>response.data);
}


//get posts by category
export const loadPostsByCategory=(categoryId)=>{
    
    return myAxios.get(`/api/post/c/${categoryId}`).then(response=>response.data);
}

//get posts by User
export const loadPostsByUser=(userId)=>{
    
    return myAxios.get(`/api/post/u/${userId}`).then(response=>response.data);
}

// delete post
export const removePost=(postId)=>{
    
    return privateAxios.delete(`/api/post/delete/${postId}`).then(response=>response.data);
}


// updatePost
export const updatePost = (post,postId,categoryId) => {

    return privateAxios
    .put(`/api/post/${postId}/${categoryId}`,post)
    .then((response) => response.data);
}