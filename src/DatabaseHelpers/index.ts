import mssql from 'mssql'
import {sqlConfig} from '../config/index'


export class ControllerHelpers {
    
    private static pool: Promise<mssql.ConnectionPool> = mssql.connect(sqlConfig)
    
    private static addInputsToRequest(request:mssql.Request, data:{[x:string]:string|number}={}){
        const keys = Object.keys(data)
        keys.map(keyName => {
            // .input('pname',prod)
            return request.input(keyName,data[keyName])
        })
        return request
    }

    static async exec (storedProcedure:string, data:{[x:string]:string|number} = {}){
        let request:mssql.Request = await(await ControllerHelpers.pool).request()
        request = ControllerHelpers.addInputsToRequest(request, data)
        return await request.execute(storedProcedure)
    }
    static async query(queryString:string){
        return (await ControllerHelpers.pool).request().query(queryString)
    }
}