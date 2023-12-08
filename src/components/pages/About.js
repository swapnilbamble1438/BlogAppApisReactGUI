import Base from "../Base";
import UserContext from "../../context/UserContext";


function About()
{
 

    

    return(

        

        <Base>


            <UserContext.Consumer>
                {
                    (object)=>(
                        
                        
                        <div  className="text-center mt-4"><h3>Welcome  { object.user?.name} <br></br>
                        To {object.appName.name} </h3>
                        
                        </div>
                     
                    )
                }
            </UserContext.Consumer>
        
        </Base>
    )
}

export default About;