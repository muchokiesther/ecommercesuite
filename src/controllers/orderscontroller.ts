import {Response,RequestHandler,Request} from 'express'
import mssql from 'mssql'
import {v4 as uid} from 'uuid'
import {sqlConfig} from '../config'
import {ControllerHelpers} from '../DatabaseHelpers/index'
import {iorders,OrderExtendedRequest} from '../Interfaces/index'


export const createOrder = async(req:OrderExtendedRequest, res:Response) => {
    try {
        let id = uid()
        
        // const pool = await mssql.connect(sqlConfig)
        const {pid,pname,price,pcount} = req.body
        // await pool.request()
        // .input('orderid',id)
        // .input('pid',pid)
        // .input('pname',pname)
        // .input('price',price)
        // .input('pcount',pcount)
        // .execute('createOrder')

        await ControllerHelpers.exec('createOrder',{orderid:id,pid,pname,price,pcount})
        return res.status(201).json({message:"Order created successfully"})
        
    } catch (error:any) {
        // occurrence of server side error
        return res.status(500).json(error.message)
    }
}

export const getOrderById:RequestHandler<{id:string}>=async(req,res)=>{
    try{
            const{id}=req.params
            const pool = await mssql.connect(sqlConfig)

            //    let item:iorders =(await(await pool.request())
            //    .input('orderid', id)
            //    .execute('viewOrders')).recordset[0]
            let item:iorders[] = (await ControllerHelpers.exec('viewOrders',{orderid:id})).recordset
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

export const deleteOrder = async (req:Request <{id:string}> , res:Response) =>{

    try {
        // const pool = await mssql.connect(sqlConfig)
        const{id} = req.params
            // let item:iorders =(await(await pool.request())
            //     .input('orderid', id)
            //     .execute('viewOrders')).recordset[0]
        let item:iorders[] = (await ControllerHelpers.exec('viewOrders',{orderid:id})).recordset
        if(!item)
        {
            return res.status(404).json({message:"order not exists"})
        }

        // await pool.request().input('orderid',id).execute('deleteOrder')
        await ControllerHelpers.exec('deleteOrder',{orderid:id})

        return res.status(200).json({message: "order deleted Successfully"})
    } 
    catch (error:any) {
        return res.status(500).json(error.message)
    } 

}

export const UpdateOrders=async(req:OrderExtendedRequest, res:Response) => {
    try {
        const {orderid} = req.params
        // const pool = await mssql.connect(sqlConfig)
        // let item:iorders =(await(await pool.request())
        // .input('orderid', orderid)
        // .execute('viewOrders')).recordset[0]
        let item:iorders[] = (await ControllerHelpers.exec('viewOrders',{orderid})).recordset
        if(!item)
        {
                return res.status(404).json({message:"order not exists"})
        }

        const {pid,pname, price, pcount} = req.body
        if (req.info?.roles ==='admin'){
            // await pool.request()
            // .input('orderid', orderid)
            // .input('pid',pid)
            // .input('pname',pname)
            // .input('price',price)
            // .input('pcount',pcount)
            // .execute('updateOrder')
            await ControllerHelpers.exec('updateOrder',{orderid,pid,pname,price,pcount})

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
        // const pool = await mssql.connect(sqlConfig)
        // let item:iorders[] = (await pool.request().execute('getallorders')).recordset
        let item:iorders[] = (await ControllerHelpers.exec('getallorders')).recordset
        if(item) {
            return res.status(200).json(item)
        }
        return res.status(404).json({message:"unsuccessful"})
        
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}