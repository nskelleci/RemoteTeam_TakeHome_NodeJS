import credentials from "../vars/credentials";
import githubProcessor from "./githubProcessor";
import gitlabProcessor from "./gitlabProcessor";
import IPlatformProcessor from "./IPlatformProcessor";

export default class processorFactory {
    _credentials: credentials

    constructor(credentials:credentials){
        this._credentials = credentials
    }

    createProcessor(): IPlatformProcessor{
        switch (this._credentials.platformPrefix) {
            case "gth":
                return new githubProcessor(this._credentials)
                break;
            case "gtl" :
                return new gitlabProcessor(this._credentials)
                break;
            default: // refactoring needed for default return
                return new githubProcessor(this._credentials)
        }
        
    }
    
}