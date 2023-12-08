import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../Base";
import { useEffect, useState } from "react";
import { signUp } from "../../services/UserService";
import {toast} from 'react-toastify';


const Signup=()=>{

    const [user,setUser] =useState({

        name:'',
        email:'',
        password:'',
        about:''

    })

    const [error,setError]=useState({
        
        errors:{},
        isError:false
    })

    useEffect(()=>{
//console.log(user);

    },[user])


    // handle change
    const handleChange = (event,property)=>{
     //   console.log("name changed");
      //  console.log(event.target.value);
      setUser({...user,[property]:event.target.value});
    }


    // reseting the form
    const resetUser=()=>{
        setUser({
            name:'',
            email:'',
            password:'',
            about:''
        })
    }

    // submit the form
    const submitForm=(event)=>{
        event.preventDefault()

        // if(error.isError)
        // {
        //     toast.error("Form data is invalid ! correct all details then submit");
        //     setError({...error,isError:false})
        //     return;
        // }

        console.log(user);

        // data validate

        // call server api for sending the data
        signUp(user).then((resp)=>{
            
            console.log(resp);
            console.log("success log");
            toast.success("User is Registered Successfully ! userid is" + user.id);
            setUser({
                name:'',
                email:'',
                password:'',
                about:''
            });
        }).catch((error)=>{
            console.log(error);
            console.log("Error log");

            // handling errors
            setError({
                errors:error,
                isError:true
            })

            toast.error("Registration failed ! Same Email Id already exists");

        });
    };


    return(
        <>
        <Base>

        <Container>
            <Row className="mt-4">
                <Col sm={{size:6,offset:3}} >
                    <Card color="dark" inverse>

                    <CardHeader>
                    <h3>Fill Information to Register!</h3>
                    </CardHeader>

                    <CardBody>
                        <Form onSubmit={submitForm}>

                            {/* Name Field */}
                            <FormGroup>
                                <Label for="name"> Enter Name</Label>
                                <Input 
                                    type="text" placeholder="Enter here"
                                    name="name" onChange={(e)=>handleChange(e,'name')}
                                    value={user.name} 
                                    invalid={error.errors?.response?.data?.name ? true:false}
                                />
                                <FormFeedback>
                                    {error.errors?.response?.data?.name }
                                </FormFeedback>
                            </FormGroup>

                            {/* Email Field */}
                            <FormGroup>
                                <Label for="email"> Enter Email Id</Label>
                                <Input 
                                    type="email" placeholder="Enter here"
                                    name="email" onChange={(e)=>handleChange(e,'email')}
                                    value={user.email}
                                    invalid={error.errors?.response?.data?.email ? true:false}
                                />
                                 <FormFeedback>
                                    {error.errors?.response?.data?.email }
                                </FormFeedback>
                            </FormGroup>

                            {/* Password Field */}
                            <FormGroup>
                                <Label for="password"> Enter Password</Label>
                                <Input 
                                    type="text" placeholder="Enter here"
                                    name="password" onChange={(e)=>handleChange(e,'password')}
                                    value={user.password}
                                    invalid={error.errors?.response?.data?.password ? true:false}
                                />
                                 <FormFeedback>
                                    {error.errors?.response?.data?.password }
                                </FormFeedback>
                            </FormGroup>

                            {/* About Field */}
                            <FormGroup>
                                <Label for="about"> Enter About</Label>
                                <Input 
                                    type="textarea" placeholder="Enter here"
                                    name="about" style={{height: "120px"}}
                                    onChange={(e)=>handleChange(e,'about')}
                                    value={user.about}
                                    invalid={error.errors?.response?.data?.about ? true:false}
                                />
                                 <FormFeedback>
                                    {error.errors?.response?.data?.about }
                                </FormFeedback>
                            </FormGroup>

                            <Container className="text-center">
                                <Button outline color="light">Register</Button>
                                <Button onClick={resetUser}  color="secondary" type="reset" className="ms-2">Reset</Button>
                            </Container>

                        </Form>
                    </CardBody>


                    </Card>

                
                </Col>

            </Row>
            </Container>

            {JSON.stringify(user)}
        </Base>
        </>

    );
}

export default Signup;