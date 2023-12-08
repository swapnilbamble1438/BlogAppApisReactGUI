import React, { useEffect, useState } from 'react'
import Base from '../Base'
import { Link, json, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from 'reactstrap';
import { loadPostByPostId } from '../../services/PostService';
import { toast } from 'react-toastify'
import { BASE_URL } from '../../services/helper';
import { getCurrentUserDetails, isLoggedIn } from '../../auth/UserLoginLogout';

import {
    NavLink
  } from 'reactstrap';
import {NavLink as ReactLink, useNavigate} from "react-router-dom";
import { addComment } from '../../services/CommentService';
import { removeComment } from '../../services/CommentService';


const PostPage=()=> {
    const navigate = useNavigate();

    const {postId} = useParams();

    const[post,setPost] = useState('');

    const [login,setLogin] = useState(false);
  const[user,setUser] = useState({});

  const[comment,setComment]= useState({
    content:''
  });


    useEffect(()=>{
        //
        setLogin(isLoggedIn());
        setUser(getCurrentUserDetails());


        // load post by postId
        loadPostByPostId(postId).then(response=>{
            console.log(response);
            setPost(response);

            console.log(response.comments[0]);

        }).catch(error=>{
            console.log(error);
            toast.error("Error in loading post");
        })
      
    },[login],[user],[post]);
    
    const prindDate=(numbers)=>{
        return new Date(numbers).toLocaleDateString();

    }

    // create Comment
    const createComment=(comment)=>{

        if(!login){
            toast.error("Need to login first");
            return;
        }
      
        console.log(comment);


        if(comment.content.trim() == '')
        {
            toast.error("Write something first");
            return;
        }
        // else submit the form
        addComment(comment,post.postId,user.id).then(response=>{
            toast.success("Comment Submitted successfully..");
            setComment({
                content:''
            })
            console.log("New Res: "+ JSON.stringify(response));

       //   window.location.reload(false);
        
           setPost({
            ...post,comments:[...post.comments,response]
          })

        }).catch((error)=>{
            toast.error("Failed to post a Comment, Something went wrong");
        })
    }


    // delete comment
    const  deleteComment=(commentId)=>{
     
        console.log(commentId);
        removeComment(commentId).then(response=>{

            toast.success("Comment Deleted successfully..");
          
            console.log("New Res: "+ JSON.stringify(response));

          //  window.location.reload(false);

            setPost(response);
          

        }).catch((error)=>{
            toast.error("Failed to delete a Comment, Something went wrong");
        })
       
    }

    

  return (
    <Base>
       <Container className='mt-4'>

             <Link to="/">Home</Link> /{post && (<Link to="">{post.title}</Link>) }
            <Row>
                <Col md={{size:12}}>
                    <Card className='mt-3 ps-2 border-0 shadow-sm'>
                       {
                        (post) &&(
                        <CardBody>
                            <CardText>Posted By <b>{post.user.name}</b> on <b>{prindDate(post.addedDate)}</b></CardText>
                            <CardText>
                                <span className='text-muted'>{post.category.categoryTitle}</span>
                            </CardText>

                            <div className="divider" style={{
                                width:'100%',
                                height:'1px',
                                background:' #ebe9eb'
                                }} ></div>

                            <CardText className='mt-3'>
                                <h1>{post.title}</h1>
                            </CardText>
                            <div className="container image-container text-center shadow mt-4" style={{maxWidth:'50%'}}>
                                <img className='img-fluid' src={BASE_URL+'/api/post/image/'+post.postId} alt="" />
                            </div>
                            <CardText className='mt-5' dangerouslySetInnerHTML={{__html:post.content}}>

                            </CardText>
                        </CardBody>
                        )
                       }
                    </Card>
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col md={{
                    size:9,offset:1
                }}>
                    <h3>Comments ({post? post.comments.length: (0)})</h3>
                    {
                        (post)
                         && (
                                post.comments
                                .sort((a,b)=> a.id > b.id ? 1:-1)
                                .map((c,index)=>(
                              
                                <Card key={c.id}  className='mt-2 border-0'>
                                    <CardBody >
                                        <CardText>
                                          <b>{c.user.name}</b><br></br>
                                            {c.content}
                                        </CardText>
                                    { 
                                  
                                        (c.user.id == user?.id)? 
                                        <Button onClick={()=>deleteComment(c.id)} color='danger' style={{marginRight:'0', marginLeft:'auto',display:'block'}}>Delete</Button>
                                        :<div></div>
                            
                                    }
                                    </CardBody>
                               
                               
                                </Card> 
                                     
                                ))

                            )
                        
                    }
                    
                        <Card className='mt-2 border-0'>
                        <CardBody>
                            <Input type="textarea" placeholder="Enter here"
                            onChange={(e)=>setComment({content:e.target.value})}
                            value={comment.content}/>
                            <Button onClick={()=>createComment(comment)} className='mt-2' color="primary">Submit</Button>
                        </CardBody>
                        </Card> 
                        
                       
                    {/* {JSON.stringify(comment)}
                    {
                        !login &&(
                        <Card className='mt-2 border-0'>
                        <CardBody>
                            <div>
                                <Button tag={ReactLink} color="primary" to="/login">Login to Post a Comment</Button>
                            </div>
                        </CardBody>
                        </Card> 
                        )
                    } */}
                </Col>
            </Row>
       </Container>
    </Base>
  )
}

export default PostPage