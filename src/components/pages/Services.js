import Base from "../Base"
import UserContext from "../../context/UserContext";
import { useContext } from "react";


const Services=()=>
{

    
    const contextData = useContext(UserContext);

    return(
        <>
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

        </>
    );
}

export default Services;