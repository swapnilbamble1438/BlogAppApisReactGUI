
import PropTypes from 'prop-types'
import React, { Component, useEffect, useMemo, useRef, useState } from 'react'
import {Button, Card,CardBody, Container, Form, Input, Label} from 'reactstrap'
import { loadAllCategories } from '../services/CategoryService'
import JoditEditor from 'jodit-react'
import { toast } from 'react-toastify'
import { addPost, loadPostsByUser, uploadPostImage } from '../services/PostService'
import { getCurrentUserDetails } from '../auth/UserLoginLogout'

const AddPost=({loadPosts})=> {

    const [categories,setCategories] = useState([]);
  
    // get userId of loggedin user or userId of current user
  const [user,setUser] = useState({});

  //
  const [image,setImage] = useState('');

    useEffect(()=>{

            setUser(getCurrentUserDetails())

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



    const[post,setPost] = useState({
        title:'',
        content:''
    })

    const postChange = (event,property) =>{
        if(property === 'content')
         {
           setPost({...post,[property]:event});
         }
         else{
            setPost({...post,[property]:event.target.value});
         }  
      }

      const[category,setCategory]  = useState({
        categoryId:''
      })

      const categoryChange = (event,property) =>{
        setCategory({...category,[property]:event.target.value});
      }


   // creat Post function
   const createPost=(event)=>{
    event.preventDefault();
    console.log(post);
    console.log(category);
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
        addPost(post,user.id,category.categoryId).then(response=>{
        

            loadPosts();


           toast.success("Post created successfully...");
       
               setPost({
                   title:'',
                   content:''
               })
               setCategory({
                   categoryId:''
               })
               
           }).catch((error)=>{
               toast.error("Failed to create Post, Something went wrong");
           })
       
    }
    else if(image == undefined || image != null)
    {
                if(image.type == 'image/png' ||
            image.type == 'image/jpeg' ||
            image.type == 'image' ||
            image.type == 'png' ||
            image.type == 'jpeg' ||
            image.type == 'jpg' ||
            image.type == 'webp')
            {  
            addPost(post,user.id,category.categoryId).then(response=>{
                

                // uploading image
                    uploadPostImage(image,response.postId).then(response=>{
                        toast.success("Image Uploaded successfully");
                    }).catch(error=>{
                        toast.error("Error in uploading image");
                        console.log(error);
                    })
                    
                    loadPosts();

                toast.success("Post created successfully...");

                setPost({
                    title:'',
                    content:''
                })
                setCategory({
                    categoryId:''
                })
                
            }).catch((error)=>{
                toast.error("Failed to create Post, Something went wrong");
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

   const resetPost =()=>{

    setPost({
        title:'',
        content:''

    })
    setCategory({
        categoryId:''
    })
    
   }

      

return(

    <div className='wrapper'>

        <Card className='shadow-sm border-0 mt-2'>
            <CardBody>
                <h1>Whats going on in your mind ?</h1>
                <Form onSubmit={createPost}>
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
                        <Button type="submit" className='rounded-0' color="dark">Create Post</Button>
                        <Button onClick={resetPost} className='rounded-0 ms-2'  color="secondary">Reset</Button>
                    </Container>
                </Form>

               
            </CardBody>
            {JSON.stringify(post)}
            <br></br>
            {JSON.stringify(category)}
          
        </Card>
        
        

    </div>

) 
}


export default AddPost;