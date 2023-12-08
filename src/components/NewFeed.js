import React, { useEffect, useState } from 'react'
import { loadAllPosts, removePost } from '../services/PostService'
import {Row,Col, Pagination, PaginationItem, PaginationLink, Container} from 'reactstrap'
import Post from './Post';
import { toast } from 'react-toastify'
import InfiniteScroll from 'react-infinite-scroll-component';

const NewFeed=() =>{

    const[posts,setPosts] = useState({
        content:[]
    });

    const[postsDetails,setPostsDetails] = useState({
        totalPages:'',
        totalElements:'',
        pageSize:'',
        lastPage:false,
        pageNo:''
    })

    const [currentPage,setCurrentPage] = useState(0);

    useEffect(()=>{
        //load all the posts from server
       
            loadPosts(currentPage,4);
        

    },[currentPage])

    const loadPosts=(pageNo,pageSize)=>{
  
        loadAllPosts(pageNo,pageSize).then(response=>{
           
            setPosts({
                content:[...posts.content,...response.content]
            });
            setPostsDetails({
                totalPages:response?.totalPages,
                totalElements:response?.totalElements,
                pageSize:response?.pageSize,
                lastPage:response?.lastPage,
                pageNo:response?.pageNo
            });

            window.scroll(0,0);
        }).catch(error=>{
            
            toast.error("Failed to load posts");
        });
    }

    const changePage=(pageNo,pageSize,pageNum)=>{

        if(pageNo > postsDetails?.pageNo  && postsDetails?.lastPage  ||
            pageNo < postsDetails?.pageNo && postsDetails.pageNo == 0 )
        {
           return;
        }
        else{
            loadPosts(pageNo,pageSize);
        }  
    }

    const changePageInfinite =()=>{
        console.log("page changed");
       setCurrentPage(currentPage+1);


    }

    
  // delete post
  const deletePost= (postId) =>{
    console.log(postId);
    removePost(postId).then(response=>{
      console.log(response);
      toast.success("Post Deleted successfully..");
          
      console.log("New Res: "+ JSON.stringify(response));

      
    //   setPosts({
    //     content:[...response]
    // });
    
    // removing the deleted post so dont need to reload
    let newPosts = posts.content.filter(p=>
        p.postId!=postId
        );

        setPosts({...posts,content:newPosts});
        

}).catch((error)=>{
      toast.error("Failed to delete a Comment, Something went wrong");
  })
 
}


  return (
        <div className="container-fluid">
            <Row>
                <Col md={{ size:12}}>
                    <h1> Blogs Count ({posts.content.length}) </h1>

                    <InfiniteScroll
                       dataLength={posts.content.length}
                       next={changePageInfinite}
                       hasMore={!postsDetails?.lastPage}
                       loader={<h4>Loading...</h4>}
                       endMessage={
                        <p style={{textAlign:'center'}}>
                            <b>Yay! You have seent it all</b>
                            </p>
                       }
                   >
                    {
                        posts.content.map(
                            (post)=>(
                            <Post post={post} key={post.postId} deletePost={deletePost}/>
                           )
                        )
                    }
                    </InfiniteScroll>
                    {/* <Container className='mt-3'>
                    <Pagination size='lg'>
                        <PaginationItem onClick={()=>changePage((postsDetails.pageNo)-1,2)} disabled={postsDetails?.pageNo == 0}>
                            <PaginationLink
                            previous>
                                Previous
                                </PaginationLink>
                        </PaginationItem>
                        {
                            [...Array(postsDetails?.totalPages)].map((item,index)=>(
                            <PaginationItem onClick={()=>changePage(index,2)} active={index == postsDetails?.pageNo} key={index}>
                                <PaginationLink>
                                  {index+1}
                                </PaginationLink>
                            </PaginationItem>

                            ))
                     }
                        <PaginationItem onClick={()=>changePage((postsDetails.pageNo)+1,2)} disabled={postsDetails?.lastPage}>
                            <PaginationLink next>
                                Next
                                </PaginationLink>
                        </PaginationItem>

                    </Pagination>
                    </Container> */}
                   
                </Col>
            </Row>
        </div>
  )
}

export default NewFeed