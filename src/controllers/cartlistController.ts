import {Response,RequestHandler,Request} from 'express'
import mssql from 'mssql'
import {v4 as uid} from 'uuid'
import {sqlConfig} from '../config'
import { iCart, CartExtendedRequest } from '../Interfaces'
import { ControllerHelpers } from '../DatabaseHelpers'





export const addItemtoCart = async (req:CartExtendedRequest, res: Response) => {
    try {
        const cid = uid()
        const {pid} = req.params
        const {email} = req.body
        await ControllerHelpers.exec('addtoCart',{cid,pid,email})
        return res.status(201).json({message:"item added successfully"})

    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

export const viewCartItems = async(req:Request, res:Response) => {

    try {
        let cartitems:iCart[] = (await ControllerHelpers.exec('viewCart')).recordset
        if(cartitems.length){
            return res.status(200).json(cartitems)
        }
        return res.status(404).json({message: "Could not find Cart items"})
        
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}



export const updateCartItems = async (req:CartExtendedRequest, res: Response) => {
    try {
        const {cid} = req.params
        const pool = await mssql.connect(sqlConfig)
        const {pid, pcount} = req.body
        // check if product exist in cart
        const exists = await pool.request().query("SELECT PID FROM Cartbasket WHERE PID='${pid}'")
        if(exists){
            await ControllerHelpers.exec('updateItemCartUser',{cid,pid,pcount})
            return res.status(200).json({message:"item updated successfully"})
        }
        return res.status(404).json({message: "product does not exist in cart"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
  }
  
  

// EXEC removeItemfromCart '23423'
export const removeCartItem = async (req:CartExtendedRequest, res: Response) => {
    try {
        const {pid} = req.params
        const pool = await mssql.connect(sqlConfig)
        // check if product exist in cart
        const exists = await pool.request().query("SELECT PID FROM Cartbasket WHERE PID='${pid}'")
        if(exists){
            await ControllerHelpers.exec('removeItemfromCart',{pid})
            return res.status(200).json({message:"item removed from cart"})
        }
        return res.status(404).json({message: "item does not exist in the cart"})
        
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
  };
  