import Base from "../Base";
import { useNavigate, useParams } from 'react-router-dom';
import { loadPostByPostId,updatePost, uploadPostImage } from '../../services/PostService';
import { getCurrentUserDetails } from '../../auth/UserLoginLogout';
import React, { Component, useEffect, useMemo, useRef, useState } from 'react'
import {Button, Card,CardBody, Container, Form, Input, Label} from 'reactstrap'
import JoditEditor from 'jodit-react'
import { toast } from 'react-toastify'
import { loadAllCategories } from "../../services/CategoryService";

const UpdateBlog=()=> {

   const {blogId} = useParams();

   const navigate = useNavigate();


   const[post,setPost] = useState({
    postId:'',
    title:'',
    content:''
 
})

 
const [categories,setCategories] = useState([]);

const[category,setCategory]  = useState({
  categoryId:''
})


     // get userId of loggedin user or userId of current user
const [user,setUser] = useState({});

//
const [image,setImage] = useState('');

  useEffect(()=>{

     // load the blog by blogId
     loadPostByPostId(blogId).then(response=>{

          setPost({
            postId: response.postId,
            title: response.title,
            content: response.content
          });

        setCategory({
          categoryId: response.category.categoryId
        });

          console.log(response);

          if(response.user.id != getCurrentUserDetails().id)
          {
            toast.error("You cannot update this Post. This is not your Post.");
            navigate("/");
          }
     }).catch(error=>{
      console.log(error);
      toast.error("Failed to load the Post");
     })
     

  },[])




  useEffect(()=>{

          setUser(getCurrentUserDetails());

          loadAllCategories().then((response)=>{
              console.log(response);
       
          setCategories(response);
          }).catch(error=>{
              console.log(error);
          });

          console.log("image: " + image);

      },[]);



      const editor = useRef(null);

  const config = useMemo(
      () => ({
          readonly: false, 
          placeholder:'Start Typing...'
      }),
      []
  );




  const postChange = (event,property) =>{
      if(property === 'content')
       {
         setPost({...post,[property]:event});
       }
       else{
          setPost({...post,[property]:event.target.value});
       }  
    }

 

    const categoryChange = (event,property) =>{
      setCategory({...category,[property]:event.target.value});
    }


 // creat Post function
 const updatingPost=(event)=>{
    event.preventDefault();

    console.log(post);
    console.log(category.categoryId);
    console.log(image);


  
    if(post.title.trim() == '')
    {
        toast.error("Title is required");  
        return;
    }
    if(post.content.trim() == '')
    {
        toast.error("Content is required");
        return;
    }
    if(category.categoryId == '')
    {
        toast.error("Category is required");
        return;
    }
  
    if(image == '' || image == null)
    {
        console.log("image is not present");
        console.log("postId: " + post.postId);
        console.log("post: " + post);
        console.log("categoryId: " + category.categoryId);
            
            updatePost(post,post.postId,category.categoryId).then(response=>{
      

            navigate("/post/"+ post.postId);
             
             toast.success("Post updated successfully...");
              
                 
             }).catch((error)=>{
                 toast.error("Failed to update Post, Something went wrong");
             })       
    }
    else if(image == undefined || image != null)
    {
        console.log("image is present");
        if(image.type == 'image/png' ||
        image.type == 'image/jpeg' ||
        image.type == 'image' ||
        image.type == 'png' ||
        image.type == 'jpeg' ||
        image.type == 'jpg' ||
        image.type == 'webp')
        {  
        updatePost(post,post.postId,category.categoryId).then(response=>{
            

            // uploading image
                uploadPostImage(image,post.postId).then(response=>{
                   
                  toast.success("Image Updated successfully");

                }).catch(error=>{
                    toast.error("Error in uploading image");
                    console.log(error);
                })
                
               
                navigate("/post/"+ post.postId); 
                 
            toast.success("Post updated successfully...");

            
        }).catch((error)=>{
            toast.error("Failed to update Post, Something went wrong");
        })

        }
        else{
            toast.error("Only Image file is allowed");
            return;
        }
    }    
}

 // handle file change event
 const handleFileChange=(event)=>{
  console.log(event.target.files[0]);
  setImage(event.target.files[0]);
  console.log("File Type: " + image.type);
 }

    

return(
  <Base>

  <div className='wrapper'>

      <Card className='shadow-sm border-0 mt-2'>
          <CardBody>
              <h1>Whats going on in your mind ?</h1>
              <Form onSubmit={updatingPost}>
                  {/* Post Title Field */}
                  <div className='my-3'>
                      <Label for="title">Post Title</Label>
                      <Input type="text" id="title" name="title"
                      placeholder='Enter here'
                      className='rounded-0'
                      onChange={(e)=>postChange(e,'title')}
                      value={post.title}/>
                  </div>
                    {/* Post Content Field */}
                    {/* <div className='my-3'>
                      <Label for="content">Post Content</Label>
                      <Input type="textarea" id="content"
                      placeholder='Enter here'
                      className='rounded-0'
                      style={{height:'300px'}}/>
                  </div> */}
                  <JoditEditor
                  ref={editor}
                  value={post.content}
                  config={config}
                  onChange={(e)=> postChange(e,'content')}
                  />


                  {/* Post Image/File Field  */}
                  <div className="mt-3">
                      <Label for="image" > Select Post Banner</Label>
                      <Input type="file"
                      onChange={handleFileChange}
                      />
                  </div>


                  {/* Post Category Field */}
                  <div className='my-3'>
                      <Label for="category">Post Category</Label>
                      <Input type="select" id="categoryId" name="categoryId"
                       onChange={(e)=>categoryChange(e,'categoryId')}
                      placeholder='Select here'
                      className='rounded-0'
                      value={category.categoryId}
                      defaultValue={''}
                      >
                          <option disabled value={''}>--Select Category--</option>
                         {
                          categories.map(
                              (category) =>
                              <option value={category.categoryId} key={category.categoryId} >
                                  {category.categoryTitle}
                              </option>
                          )
                         }
                          

                       </Input>   
                  </div>
                  <Container className='text-center'>
                      <Button type="submit" className='rounded-0' color="dark">Update Post</Button>
                      
                  </Container>
              </Form>

             
          </CardBody>
          {JSON.stringify(post)}
          <br></br>
          {JSON.stringify(category)}
        
      </Card>
      
      

  </div>
  </Base>

)
}

export default UpdateBlog