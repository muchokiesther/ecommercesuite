import {Response,RequestHandler,Request} from 'express'
import mssql from 'mssql'
import {v4 as uid} from 'uuid'
import {sqlConfig} from '../config'
import {ControllerHelpers} from  '../DatabaseHelpers';
import { iorders, ordersExtendedRequest, DecodedData } from '../Interfaces'
// interface DecodedData {
//     id: string
//     userName: string
//     fullName: string
//     email: string
//     phoneNumber: number
//     roles: string
//   }
// interface iorders {
//     ORDERID:string
//     PID:string
//     PNAME:string
//     PCOUNT:string
//     PRICE:number
//     ISDELETED: number

// }

// interface ordersExtendedRequest extends Request {
//     body: {
//         pid:string
//         pname:string
//         price:number
//         pcount:number

//     }
//     info?: DecodedData
//     params: {
//         id: string;
//         pid:string;
//         orderid:string
//     }
//   }
  


export const createOrder = async(req:ordersExtendedRequest , res:Response) => {
    try {
        let id = uid()
        
        //const pool = await mssql.connect(sqlConfig)
        const {pid,pname,price,pcount} = req.body
        await ControllerHelpers.exec('createOrder',{orderid:id,pid,pname,price,pcount})
        // await pool.request()
        // .input('orderid',id)
        // .input('pid',pid)
        // .input('pname',pname)
        // .input('price',price)
        // .input('pcount',pcount)
        // .execute('createOrder')
        return res.status(201).json({message:"Order created successfully"})
        
    } catch (error:any) {
        // occurrence of server side error
        return res.status(500).json(error.message)
    }
}

export const getOrderById:RequestHandler=async(req,res)=>{
    try{
            const{orderid:id}=req.params
        //   const pool = await mssql.connect(sqlConfig)
           let item: iorders = await(await ControllerHelpers.exec('viewOrders', {  orderid:id })).recordset[0]

        //    .input('orderid', id)
        //    .execute('viewOrders')).recordset[0]
           if(!item)
           {
                return res.status(404).json({message:"order not exists"})
           }
           return res.status(200).json(item)
   
           }catch(error:any){
           return res.status(500).json(error.message)
       }
   }

   export const deleteOrder = async (req:Request <{id:string}> , res:Response) =>{

    try {
    //    const pool = await mssql.connect(sqlConfig)
        const{id} = req.params
        let item: iorders = await(await ControllerHelpers.exec('viewOrders', {  orderid:id })).recordset[0]

        // let item:iorders =(await(await pool.request())
        //    .input('orderid', id)
        //    .execute('viewOrders')).recordset[0]
           if(!item)
           {
                return res.status(404).json({message:"order not exists"})
           }

       await( await ControllerHelpers.exec('deleteOrder', { orderid:id }));
        return res.status(200).json({message: "order deleted Successfully"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    } 

   }

   export const UpdateOrders=async(req:ordersExtendedRequest , res:Response) => {
    try {
        const {orderid} = req.params
     //   const pool = await mssql.connect(sqlConfig)
        let item: iorders = await(await ControllerHelpers.exec('viewOrders', {  orderid })).recordset[0]

        if(!item)
        {
             return res.status(404).json({message:"order not exists"})
        }

        const {pid,pname, price, pcount} = req.body
        if (req.info?.roles ==='admin'){
            await ControllerHelpers.exec('updateOrder',{orderid,pid,pname,price,pcount})
        // .execute('updateOrder')

        return res.status(200).json({message:"Order update successfully"})
        }else{
            return res.status(403).json({message:"Access denied!"})
        }
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const getAllOrders = async(req:Request, res:Response) => {
    try {
        const pool = await mssql.connect(sqlConfig)
        let item:iorders[] = await(await ControllerHelpers.exec('getallorders')).recordset
        if(item) {
            return res.status(200).json(item)
        }
        return res.status(404).json({message:"unsuccessful"})
        
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}