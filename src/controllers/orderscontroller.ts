import {Response,RequestHandler,Request} from 'express'
import mssql from 'mssql'
import {v4 as uid} from 'uuid'
import {sqlConfig} from '../config'
import {ControllerHelpers} from  '../DatabaseHelpers';
import { iorders, OrdersExtendedRequest, DecodedData } from '../Interfaces'


export const createOrder = async(req:OrdersExtendedRequest , res:Response) => {
    try {
        let orid = uid()
        const {cid} = req.body       
        //const pool = await mssql.connect(sqlConfig)

        await ControllerHelpers.exec('createOrder',{orid, cid})
        return res.status(201).json({message:"Order created successfully"})
        
    } catch (error:any) {
        // occurrence of server side error
        return res.status(500).json(error.message)
    }
}

export const getOrderById=async(req:OrdersExtendedRequest,res:Response)=>{
    try{
            const{orderid}=req.params     
           let item: iorders = await(await ControllerHelpers.exec('viewOrders', { orderid})).recordset[0]

       
           if(!item)
           {
                return res.status(404).json({message:"order not exists"})
            }
            
            return res.status(200).json(item)
   
           }
           catch(error:any){
                return res.status(500).json(error.message)
       }
   }

export const deleteOrder = async (req:OrdersExtendedRequest, res:Response) =>{

    try {
    //    const pool = await mssql.connect(sqlConfig)
        const{orderid} = req.params
        let item: iorders = await(await ControllerHelpers.exec('viewOrders', { orderid})).recordset[0]       
        if(!item)
        {
             return res.status(404).json({message:"order not exists"})
         }
         

        await ControllerHelpers.exec('deleteOrder', { orderid })
        return res.status(200).json({message: "order deleted Successfully"})
    } 
    catch (error:any) {
        return res.status(500).json(error.message)
    } 

}

   export const UpdateOrders=async(req:OrdersExtendedRequest , res:Response) => {
    try {
        const {orderstatus} = req.body
        const {orderid} = req.params
        let item: iorders = await(await ControllerHelpers.exec('viewOrders', {orderid})).recordset[0]

        if(!item)
        {
             return res.status(404).json({message:"order not exists"})
         }

        
        if (req.info?.UROLE ==='admin'){
            await ControllerHelpers.exec('updateOrder',{orderid,orderstatus})
            return res.status(200).json({message: "order updated successfully"})
        }else{
            return res.status(403).json({message:"Access denied!"})
        }
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const getAllOrders = async(req:Request, res:Response) => {
    try {
        let orders:iorders[] = (await ControllerHelpers.exec('viewActiveorders')).recordset
        
        if(orders) {
            return res.status(200).json(orders)
        }
        return res.status(404).json({message: "no orders found"})
        
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}