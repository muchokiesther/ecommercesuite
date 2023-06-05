import {Response,RequestHandler,Request} from 'express'
import {v4 as uid} from 'uuid'
import { iProducts,ProductsExtendedRequest } from '../Interfaces'
import {ControllerHelpers} from  '../DatabaseHelpers';

// add product
export const addProduct = async(req:ProductsExtendedRequest, res:Response) => {
    try {
        // console.log(req.info);
        // console.log(req.info?.UROLE)
        if ( req.info && req.info?.UROLE === 'admin') {     
            let pid = uid()
            const {pname,pdescription, pimage, price, pquantity, pcategory} = req.body
            
            await ControllerHelpers.exec('addProduct',{pid,pname,pdescription,pimage,pquantity,price, pcategory})
            return res.status(201).json({message:"product added successfully"})

        }
        else{
            return res.status(403).json({ message: 'Cannot add Access denied' });
        }
    } catch (error:any) {
        // occurrence of server side error
        return res.status(500).json(error.message)
    }
}

// get each product
export const getProduct = async(req:ProductsExtendedRequest,res:Response) => {
    try {
        const {pid} = req.params
        let product:iProducts = await(await ControllerHelpers.exec('getproductByid',{pid})).recordset[0]
        //console.log(product)
        if(!product){
            return res.status(404).json({message:"product not exists"})
        }
        return res.status(200).json(product)
        
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

// get all products
export const getallProducts = async(req:Request, res:Response) => {
    try {
        let products:iProducts[] = await(await ControllerHelpers
        .exec('getAllproducts')).recordset
        return res.status(200).json(products)
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}


export const UpdateProduct =  async(req:ProductsExtendedRequest, res:Response) => {

    try {
        const {pid} = req.params
       //  const pool = await mssql.connect(sqlConfig)
        
        let product:iProducts[] = await(await ControllerHelpers.exec ('getproductByid',{pid})).recordset
        if(!product.length){
            return res.status(404).json({message:"product not exists"})
        }
        const {pname, pdescription, pimage, price, pquantity, pcategory} = req.body
        if ( req.info && req.info!.UROLE === 'admin') {
            await ControllerHelpers.exec('updateProduct',{pid,pname,pdescription,pimage,pquantity,price,pcategory})
            return res.status(200).json({message:"product updated successfully"})
    }else{
        return res.status(403).json({ message: 'Access denied' });
    }

    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}


export const deleteProduct = async(req:ProductsExtendedRequest, res:Response) => {

    try {
       
        const {pid} = req.params
        let product:iProducts[] =  await(await ControllerHelpers.exec ('getproductByid',{pid})).recordset

        if(!product.length){
            return res.status(404).json({message:"product not exists"})
        }

        if ( req.info && req.info!.UROLE === 'admin') {        
            await(await ControllerHelpers.exec('deleteProduct',{pid})).recordset
            return res.status(200).json({message:"product deleted successfully"})
        }else{
            return res.status(403).json({ message: 'Access denied' });
        }
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}