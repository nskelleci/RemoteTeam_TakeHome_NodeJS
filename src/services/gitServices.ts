import axios, {AxiosRequestConfig, Method, AxiosResponse, AxiosError} from 'axios';
import AxiosOptions from '../vars/axiosOptions';
import credentials from '../vars/credentials';

class gitServices {
    
    async fetch( credentials: credentials, options: AxiosOptions){
        const config: AxiosRequestConfig = {
            baseURL : options.baseurl,
            method : <Method>options.method,
            url : options.url,
            data : options.body,
            params : options.params,
            headers : {Accept: "application/json", "User-Agent": "API-Evangelist-Network", 
                        Authorization: `Bearer ${credentials.token}`
                        }
        }

        console.log("from service -- config==", config)
        return await axios(config).then((response)=>{
            return response
        }).catch((err)=>{
            return err.response
        });
    }    
}

export default new gitServices()