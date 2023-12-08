import { myAxios } from "./helper";

export const loadAllCategories=() =>{
    return myAxios.get('api/category/getall')
    .then((response)=>{
       return response.data
    });

}