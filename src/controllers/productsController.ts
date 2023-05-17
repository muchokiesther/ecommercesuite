import {Response,RequestHandler,Request} from 'express'
import mssql from 'mssql'
import {v4 as uid} from 'uuid'
import {sqlConfig} from '../config'
import {ControllerHelpers} from '../DatabaseHelpers/index'
import {iProducts,ProductExtendedRequest} from '../Interfaces/index'


// add product
export const addProduct = async(req:ProductExtendedRequest, res:Response) => {
    try {
        // console.log(req.info?.roles);
        if ( req.info && req.info?.roles === 'admin') {

            let id = uid()
            // console.log(id);        
            // const pool = await mssql.connect(sqlConfig)
            const {pname,pdescription, pimage, price} = req.body
            // await pool.request()
            // .input('pid',id)
            // .input('pname',pname)
            // .input('pdescription',pdescription)
            // .input('pimage',pimage)
            // .input('price',price)
            // .execute('addProduct')

            await ControllerHelpers.exec('addProduct',{pid:id,pname,pdescription,pimage,price})

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
export const getProduct:RequestHandler<{id:string}> = async(req,res) => {
    try {
        const {id} = req.params
        // const pool = await mssql.connect(sqlConfig)
        // console.log(productId)
        // let product:iProducts = (await (pool.request())
        // .input('pid',id)
        // .execute('getproductByid')).recordset[0]
        let product:iProducts[] = (await ControllerHelpers.exec('getproductByid',{pid:id})).recordset
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
        // const pool = await mssql.connect(sqlConfig)
        // let products:iProducts[] = (await pool.request()
        // .execute('getAllproducts')).recordset
        let products:iProducts[] = (await ControllerHelpers.exec('getAllproducts')).recordset
        return res.status(200).json(products)
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}


export const UpdateProduct = async(req:ProductExtendedRequest, res:Response) => {
    try {
        const {id} = req.params
        // const pool = await mssql.connect(sqlConfig)
        // let product:iProducts[] = (await pool.request()
        // .input('pid',id)
        // .execute('getproductByid')).recordset
        let product:iProducts[] = (await ControllerHelpers.exec('getproductByid',{pid:id})).recordset
        if(!product.length){
            return res.status(404).json({message:"product not exists"})
        }
        
        if ( req.info && req.info?.roles === 'admin') {
            // await pool.request()
            // .input('pid',id)
            // .input('pname', pname)
            // .input('pdescription', pdescription)
            // .input('pimage', pimage)
            // .input('price', price)
            // .execute('updateProduct')
            const {pname, pdescription, pimage, price} = req.body
            await ControllerHelpers.exec('updateProduct',{pid:id, pname,pdescription,pimage,price})
            return res.status(200).json({message:"product update successfully"})
        }
        else {
            return res.status(403).json({message:"only admin can update"})
        }       

    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}


export const deleteProduct = async(req:ProductExtendedRequest, res:Response) => {

    try {
       
        // const pool = await mssql.connect(sqlConfig)
        const {id} = req.params
        // let product:iProducts[] = (await pool.request()
        // .input('pid',id)
        // .execute('getproductByid')).recordset
        let product:iProducts[] = (await ControllerHelpers.exec('getproductByid',{pid:id})).recordset
        if(!product.length){
            return res.status(404).json({message:"product not exists"})
        }

        if (req.info?.roles == 'admin') {
            // await pool.request()
            // .input('pid',id)
            // .execute('deleteProduct')
            await ControllerHelpers.exec('deleteProduct',{pid:id})
            return res.status(200).json({message:"product deleted successfully"})
        }else{
            return res.status(403).json({ message: 'Access denied' });
        }
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}