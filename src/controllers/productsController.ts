import {Response,RequestHandler,Request} from 'express'
import mssql from 'mssql'
import {v4 as uid} from 'uuid'
import {sqlConfig} from '../config'
import { iProducts,productsExtendedRequest,DecodedData } from '../Interfaces'
import {ControllerHelpers} from  '../DatabaseHelpers';

// interface DecodedData {
//     id: string
//     userName: string
//     fullName: string
//     email: string
//     phoneNumber: number
//     roles: string
//   }
// interface iProducts {
//     PID:string
//     PNAME:string
//     PDESCRIPTION:string
//     PIMAGE:string
//     PRICE:number
//     ISDELETED: number
// }

// interface productsExtendedRequest extends Request {
//     body: {
//         pname:string
//         pdescription:string
//         pimage:string
//         price:number
//     }
//     info?: DecodedData
//     params: {
//         id: string;
//         pid: string;
//     }
//   }
  



// add product
export const addProduct = async(req:productsExtendedRequest, res:Response) => {
    try {
        console.log(req.info?.roles);
        if ( req.info && req.info?.roles === 'admin') {
   
      
        let pid = uid()
        // console.log(id);
        
        const pool = await mssql.connect(sqlConfig)
        const {pname,pdescription, pimage, price} = req.body
        await ControllerHelpers.exec('addProduct',{pid,pname,pdescription,pimage,price})
        // await pool.request()

        // .input('pid',id)
        // .input('pname',pname)
        // .input('pdescription',pdescription)
        // .input('pimage',pimage)
        // .input('price',price)
        // .execute('addProduct')


        return res.status(201).json({message:"product added successfully"})
        }else{
            return res.status(403).json({ message: 'Access denied' });
        }
    } catch (error:any) {
        // occurrence of server side error
        return res.status(500).json(error.message)
    }
}

// get each product
export const getProduct:RequestHandler = async(req,res) => {
    try {
        const {pid} = req.params
        // const pool = await mssql.connect(sqlConfig)
        // console.log(productId)
        let product:iProducts = await(await ControllerHelpers.exec ('getproductByid',{pid})).recordset[0]

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
        const pool = await mssql.connect(sqlConfig)
        let products:iProducts[] = await(await ControllerHelpers
        .exec('getAllproducts')).recordset
        return res.status(200).json(products)
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}


export const UpdateProduct =  async(req:productsExtendedRequest, res:Response) => {

    try {
        const {pid} = req.params
       //  const pool = await mssql.connect(sqlConfig)
        
        let product:iProducts[] = await(await ControllerHelpers.exec ('getproductByid',{pid})).recordset
        if(!product.length){
            return res.status(404).json({message:"product not exists"})
        }
        const {pname, pdescription, pimage, price} = req.body
        if ( req.info && req.info?.roles === 'admin') {
      await ControllerHelpers.exec('updateProduct',{pid,pname,pdescription,pimage,price})

        // await pool.request()
        // .input('pid',pid)
        // .input('pname', pname)
        // .input('pdescription', pdescription)
        // .input('pimage', pimage)
        // .input('price', price)
        // .execute('updateProduct')

        return res.status(200).json({message:"product updated successfully"})
    }else{
        return res.status(403).json({ message: 'Access denied' });
    }

    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}


export const deleteProduct = async(req:productsExtendedRequest, res:Response) => {

    try {
       
        const pool = await mssql.connect(sqlConfig)
        const {pid} = req.params
        let product:iProducts[] =  await(await ControllerHelpers.exec ('getproductByid',{pid})).recordset

        if(!product.length){
            return res.status(404).json({message:"product not exists"})
        }

        if ( req.info && req.info?.roles === 'admin') {

        
            await(await ControllerHelpers.exec ('deleteProduct',{pid})).recordset

        // await pool.request()
        // .input('pid',id)
        // .execute('deleteProduct')

        return res.status(200).json({message:"product deleted successfully"})
        }else{
            return res.status(403).json({ message: 'Access denied' });
        }
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}