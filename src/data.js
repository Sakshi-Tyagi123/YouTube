 const API_KEY = "AIzaSyDfH8AmaVuTER36s36D6IXdQhhAUxn_L34"
 export const value_convertor = (value)=> {
    if(value>1000000)
    {
        return Math.floor(value/1000000)+"M";
    }
    else if(value>=1000){
        return Math.floor(value/1000)+"K"
    }
    else{
        return value;
    }
 }
 export default API_KEY;