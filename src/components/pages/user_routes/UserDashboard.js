import React from 'react';
import Base from "../../Base";
import AddPost from '../../AddPost';
import { Container } from 'reactstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import { getCurrentUserDetails } from '../../../auth/UserLoginLogout';
import { loadPostsByUser, removePost } from '../../../services/PostService';
import { toast } from 'react-toastify';
import Post from '../../Post';

const UserDashboard =()=> {

  const [user,setUser] = useState({});

  const[posts,setPosts] = useState([]);

  useEffect(()=>{


      console.log(getCurrentUserDetails());
      setUser(getCurrentUserDetails());
        
      loadPostsByUser(getCurrentUserDetails().id).then(response=>{
        console.log(response);

        setPosts([...response]);
      
    }).catch(error=>{
        console.log(error);
        toast.error("Failed to load posts");
    });
      
     
 
  },[])

  //load Posts for AddPost page
  const loadPosts=()=>{
    setUser(getCurrentUserDetails());
    loadPostsByUser(getCurrentUserDetails().id).then(response=>{
      setPosts([...response]);  
  }).catch(error=>{
      console.log(error);
      toast.error("Failed to load posts");
  });
  }

  // delete post
  const deletePost= (postId) =>{
    console.log(postId);
    removePost(postId).then(response=>{
      console.log(response);
      toast.success("Post Deleted successfully..");
          
      console.log("New Res: "+ JSON.stringify(response));

      
      //setPosts([...response]);

     // removing the deleted post without
     let newPosts = posts.filter(p=>
      p.postId != postId
      );

      setPosts([...newPosts]);


    

  }).catch((error)=>{
      toast.error("Failed to delete a Comment, Something went wrong");
  })
 
}
  




  return (
    <>
    <Base>

    <Container>
      <AddPost loadPosts={loadPosts}/> 
    </Container>

      <h1 className="my-3">My Posts : ({posts.length})</h1>
      {
              posts &&
                 posts.map(
                    (post)=>(
                      <Post post={post} key={post.postId} deletePost={deletePost}/>
                     )
                       )
      }
                        
          {
              posts.length <= 0 && <h1>No Posts in this Category</h1>
           }

    </Base>
    </>
  )
}

export default UserDashboard

