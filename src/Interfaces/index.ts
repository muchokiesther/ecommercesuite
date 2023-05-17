import {Request} from 'express';
//from user controller
export interface ExtendedRequest extends Request {
    body: {
     id:string;
      userName: string;
      fullName: string;
      email: string;
      phoneNumber: number;
      password: string;
    };
    info?: UserInfo;
  }
  
  export interface UserInfo {
    id: string;
    fullName: string;
    email: string;
    roles: string;

  }
  
  export interface User {
    id: string;
    userName: string;
    fullName: string;
    email: string;
    phoneNumber: number;
    password: string;
    emailSent: number;
    isDeleted: number;
    roles: string;
    isReset:number;
  }
  

  //from products controller

 export  interface DecodedData {
    id: string
    userName: string
    fullName: string
    email: string
    phoneNumber: number
    roles: string
  }
  export  interface iProducts {
    PID:string
    PNAME:string
    PDESCRIPTION:string
    PIMAGE:string
    PRICE:number
    ISDELETED: number
}

export  interface productsExtendedRequest extends Request {
    body: {
       
        pname:string
        pdescription:string
        pimage:string
        price:number
    }
    info?: DecodedData
    params: {
        id: string;
        pid: string;
        orderid:string
    }
  }

  //orders controllers

export interface iorders {
    ORDERID:string
    PID:string
    PNAME:string
    PCOUNT:string
    PRICE:number
    ISDELETED: number
    OrdersStatus:string
}

export interface ordersExtendedRequest extends Request {
    body: {
        pid:string
        pname:string
        price:number
        pcount:number
        status:string

    }
    info?: DecodedData
    params: {
        id: string;
        pid:string;
        orderid:string
    }
  }

  //from cart controllers
 export interface iCart {
    PID:string
    PNAME:string
    PDESCRIPTION:string
    PRICE:number
    PCOUNT:number
}

export interface cartExtendedRequest extends Request {
    body: {
    
        pname:string
        pdescription:string
        price:number
    }
}