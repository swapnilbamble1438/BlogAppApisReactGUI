import React, { useEffect } from 'react'
import Base from './Base'
import { json, useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap';
import CategorySideMenu from './CategorySideMenu';
import { useState } from 'react';
import { loadPostsByCategory, removePost } from '../services/PostService';
import { toast } from 'react-toastify';
import Post from './Post';

const Categories=()=> {

    const {categoryId} = useParams();

    
    const[posts,setPosts] = useState([]);



    useEffect(()=>{
        console.log(categoryId);

        loadPosts(categoryId);
    },[categoryId])

    const loadPosts=(categoryId)=>{
  
        loadPostsByCategory(categoryId).then(response=>{
           console.log(response);

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

     // removing the deleted post without deleting
     let newPosts = posts.filter(p=>
        p.postId != postId
        );
  
        setPosts([...newPosts]);

    

  }).catch((error)=>{
      toast.error("Failed to delete a Comment, Something went wrong");
  })
 
}
  

  return (


    <Base>
        <Container className="mt-3">
                <Row>
                    <Col md={2} className="pt-5">                        
                        <CategorySideMenu/>
                    </Col>
                    <Col md={10}>
                    <h1> Blogs Count ({posts.length}) </h1>

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
                    </Col>
                </Row>
        </Container>
   


    
    </Base>
  )
}

export default Categories