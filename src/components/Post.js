import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { getCurrentUserDetails, isLoggedIn } from '../auth/UserLoginLogout';


const Post=({post={title:"This is default post title",content:"This is default content"},deletePost})=> {
  
  const [login,setLogin] = useState(false);
  const[user,setUser] = useState({});


  useEffect(()=>{

    
    console.log(getCurrentUserDetails());
    setUser(getCurrentUserDetails());

    setLogin(isLoggedIn());
    console.log(isLoggedIn());
  
  
  },[])


  
  return (


    
    <Card className='border-0 shadow-sm mt-3'>
        <CardBody>
            <h1>{post.title}</h1>
            <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,50)+'...'}}>
            </CardText>
            <div>
                <Link className='btn btn-secondary border-0' to={'/post/'+ post?.postId}>Read More</Link>
            {
              user?.id == post.user.id &&
              (
                <>
                &ensp;
                <Button tag={Link} to={`/private/updateblog/${post.postId}`}  color='info'>Update</Button>
                &ensp;
               <Button  onClick={()=>deletePost(post.postId)} color='danger'>Delete</Button>
               </>
              )
            }
            </div>
        </CardBody>
    </Card>

    
  )
}

export default Post