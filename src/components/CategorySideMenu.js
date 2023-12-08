import React, { useEffect,useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../services/CategoryService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const CategorySideMenu=()=> {

    const[categories,setCategories] = useState([]);

    useEffect(()=>{

        loadAllCategories().then((response)=>{
            setCategories([...response]);
            console.log(categories);

        }).catch((error=>{
            console.log(error);
            toast.error("Error in loading Categories");
        }))

    },[])

  return (
    
    <div>
        <ListGroup>
            <ListGroupItem tag={Link} to="/" action={true} className='border-0'>
                All Blogs
            </ListGroupItem>
            {
                categories && categories.map((c,index)=>{
                    return(
                        <ListGroupItem tag={Link} to={'/categories/'+ c.categoryId} key={index} action={true} className='border-0 shadow-0 mt-1'>
                           {c.categoryTitle}
                        </ListGroupItem>
                    )
                })
            }
        </ListGroup>
    </div>
  )
}

export default CategorySideMenu