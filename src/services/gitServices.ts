import axios, {AxiosRequestConfig, Method, AxiosResponse, AxiosError} from 'axios';
import AxiosOptions from '../vars/axiosOptions';
import credentials from '../vars/credentials';

class gitServices {
    
    async fetch( credentials: credentials, options: AxiosOptions){
        let isGet = options.method==="GET"? true : false

        console.log("options====>", options)
        const config: AxiosRequestConfig = {
            baseURL : options.baseurl,
            method : <Method>options.method,
            url : options.url,
            data : isGet ? undefined : options.body,
            params : options.params,
            headers : { 
                        Authorization: credentials.token
                        }
        }

        console.log("from service -- config==", config)
        return await axios(config).then((response)=>{
            return response
        }).catch((err)=>{
            console.log(err.response.data)
            return err.response
        });
    }    
}

export default new gitServices()