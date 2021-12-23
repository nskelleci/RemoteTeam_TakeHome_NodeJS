import {AxiosResponse} from 'axios';
import jsonata  from 'jsonata';


export default class customResponse{
    
    buildResponseStructure(response:AxiosResponse) {
        let expressions
        if(response.status>=200 && response.status<300){

        //REFACTORING MAY BE NEEDED
        expressions = jsonata(
                "{\
                    'data': data, \
                    'APIResponseMessage': 'success', \
                    'APIResponseCode':status }\
                ")
        }else{
            expressions = jsonata(
                "{\
                    'data': [], \
                    'APIResponseMessage': statusText, \
                    'APIResponseCode':status }\
                ")
        }
        let result = expressions.evaluate(response)
        return result
    }
}