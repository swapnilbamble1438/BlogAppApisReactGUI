import CustomNavbar from "./CustomNavbar";

const Base=({title="Welcome to our website", children})=>
{

    return(

        <>

            <div className ="container-fluid">

                <CustomNavbar/>

                {children}

                <div  className="text-center mt-5">
                  <span>@ BlogApp made by Swapnil Ganpat Bamble</span>
                </div>
            </div>
        
        
        
        
        </>



    );

};

export default Base;