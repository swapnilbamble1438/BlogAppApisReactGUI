import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../Base";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../services/UserService";
import { doLogin } from "../../auth/UserLoginLogout";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Login=()=>{


    const navigate = useNavigate();


   const[loginDetails,setLoginDetails] = useState({
        username:'',
        password:''
    });

    const handleChange=(event,field)=>{

        let actualValue= event.target.value;
     setLoginDetails({ ...loginDetails,[field]:actualValue});
    }


    // handle login
    const handleFormSubmit =(event) =>
    {
        event.preventDefault();
        console.log(loginDetails);

        // validation
        if(loginDetails.username.trim() == '' || loginDetails.password.trim() == '')
        {
            toast.error("Username or Password is required !");
        }
       
        // submit the data to server to generate the token
            loginUser(loginDetails).then((response)=>{
                
                console.log("logged in user details: ");
                console.log("response: " +response);

                // save the response data to localstorage
                doLogin(response,()=>{
                    console.log("Login details is saved to localstorage");
                    // redirect to user dashboard page     
                    navigate("/private/userdashboard"); 
                    
                    
                    
                })
                    console.log(localStorage.getItem("UserDetailsWithToken"));
                toast.success("Login Successful..");

            }).catch(error=>{
                console.log(error);
                if(error.response.status==404 || error.response.status == 400){
                    toast.error('Login faileld ! ' + error.response.data.message);
                }
                else{
                    toast.error("Login faileld !");
                }
            });
    }


    // reset the form
    const resetForm=()=>{
        setLoginDetails({
            username:'',
            password:''
        })
    }

    return(
        <>
        <Base>
        
        <Container>

            <Row className="mt-4">
                <Col sm={{size:6,offset:3}}>
                    <Card color="dark" inverse>

                        <CardHeader>
                            <h3>Login Here !</h3>
                        </CardHeader>

                        <CardBody>
                            <Form onSubmit={handleFormSubmit}>
                                {/*Email field*/}
                                <FormGroup>
                                    <Label for="email">Enter Email Id</Label>
                                    <Input type="email"  id="email" 
                                    value={loginDetails.username}
                                    onChange={(e)=> handleChange(e,'username')} />
                                </FormGroup>

                                  {/*Password field*/}
                                  <FormGroup>
                                    <Label for="password">Enter Passworde</Label>
                                    <Input type="password"  id="password"
                                    value={loginDetails.password} 
                                    onChange={(e)=> handleChange(e,'password')}/>
                                </FormGroup>
                                

                                <Container className="text-center">
                                <Button outline color="light">Login</Button>
                                <Button  onClick={resetForm} color="secondary" type="reset" className="ms-2">Reset</Button>
                            </Container>

                            </Form>

                        </CardBody>


                    </Card>


                </Col>

            </Row>

        </Container>
        {JSON.stringify(loginDetails)}
        </Base>
        </>

    );
}

export default Login;