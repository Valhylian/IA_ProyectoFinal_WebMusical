import * as path from 'path'
import * as fs from 'fs'
import * as os from 'os'

const ASSETS_FOLDER_NAME = "stable-diffusion-api-images"

const createFolderIfNotExists = (folderPath:string)=>{
    if(!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath)
    }
}
export const getDataFolderPath = ()=>{
    const result = path.resolve(os.tmpdir(),ASSETS_FOLDER_NAME)
    createFolderIfNotExists(result)

    return result
}

export const persisteData = (data:any, localFilePath:string)=>{
    fs.writeFileSync(localFilePath,data)
}