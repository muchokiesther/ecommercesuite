
import {Request} from 'express'  
import { string } from 'joi'

  

 export  interface DecodedData {
    USERID: string
    USERNAME: string
    FULLNAME: string
    EMAIL: string
    PHONENUMBER: number
    UROLE: string

}

export interface User{
    USERID:string
    USERNAME:string
    FULLNAME:string
    EMAIL:string
    PHONENUMBER:number
    UPASSWORD:string
    UROLE:string
    
}

export interface UserExtendedRequest extends Request{
    body:{
        username:string
        fullname:string
        email:string
        phonenumber:number
        upassword:string   
        urole:string 
    }
    info?: DecodedData
    
}


  export  interface iProducts {

    PID:string
    PNAME:string
    PDESCRIPTION:string
    PIMAGE:string
    PQUANTITY:number
    PRICE:number
    PCATEGORY: string
    ISDELETED: number
}


export  interface ProductsExtendedRequest extends Request {
    body: {      

        pname:string
        pdescription:string
        pimage:string
        price:number
        pquantity:number
        pcategory: string
    }
    info?: DecodedData
    params: {
    
        pid: string;
    }
  }


export interface iorders {
    ORDERID:string
    PID:string
    UID:string
    UEMAIL:string
    PNAME:string
    PDESCRIPTION:string
    PRICE:number
    PCOUNT:number
    ORDERDATE:string    
    ORDERSTATUS:string
    ISDELETED: number

}


export interface OrdersExtendedRequest extends Request {

    body: { 
        cid:string
        orderid: string
        orderstatus:string
     }
    info?: DecodedData
    params: {
        id: string;
        pid:string;
        orderid:string,
        cid:string

    }
}




  //from cart controllers
 export interface iCart {    
    CARTID:string
    PID:string
    UID:string
    PNAME:string
    PDESCRIPTION:string
    PRICE:number
    PCOUNT:number
}


export interface CartExtendedRequest extends Request {
    body: {
        pid:string
        email:string
        pcount:number
    }
    params: {
        pid:string
        cid:string
    }

}

