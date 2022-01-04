import gitServices from "../services/gitServices"
import AxiosOptions from "../vars/axiosOptions"
import credentials from "../vars/credentials"
import IPlatformProcessor from "./IPlatformProcessor"

export default class bugsnagProcessor implements IPlatformProcessor {
    credentials: credentials
    axiosOptions: AxiosOptions
    
    constructor(credentials:credentials){
        this.credentials = credentials

        this.axiosOptions = {
            baseurl:'https://api.bugsnag.com',
            url:'',
            method:'',
            body: {},
            params : {}
        }
    }
    // nskelleci@gmail.com Organization ID : 61d43ee36429d3000f783431

    async getApps(){
        throw new Error('error');
        
    }
    async getApp(){
        throw new Error('error');
        
    }
    async getMemberDetail(){
        throw new Error('error');
        
    }
    async editMember(){
        throw new Error('error');
    }
    
    async addMember(id:string, memberDetail:{email:string}){
        //todo
        this.axiosOptions.url = `/organizations/${id}/collaborators?per_page=10`
        this.axiosOptions.method = 'POST'
        this.axiosOptions.body = memberDetail
        const data = await gitServices.fetch(this.credentials, this.axiosOptions)
        return data
    }

    async removeMember(orgId:string, userId:number|string){
        //todo
        this.axiosOptions.url = `/organizations/${orgId}/collaborators/${userId}`
        this.axiosOptions.method = 'DELETE'
        const data = await gitServices.fetch(this.credentials, this.axiosOptions)
        return data
    }

    async getMembersOfApp(id:string) {
        this.axiosOptions.url = `/organizations/${id}/collaborators?per_page=10`
        this.axiosOptions.method = 'GET'
        const data = await gitServices.fetch(this.credentials, this.axiosOptions)
        return data
    }

}

