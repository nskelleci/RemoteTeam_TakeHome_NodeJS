import gitServices from "../services/gitServices"
import AxiosOptions from "../vars/axiosOptions"
import credentials from "../vars/credentials"
import IPlatformProcessor from "./IPlatformProcessor"

class githubProcessor implements IPlatformProcessor {
    credentials: credentials
    axiosOptions: AxiosOptions
    
    constructor(credentials:credentials){
        this.credentials = credentials

        this.axiosOptions = {
            baseurl:'https://api.github.com',
            url:'',
            method:'',
            body: {},
            params : {}
        }
    }
    
    async getApps() {
        this.axiosOptions.url = '/user/orgs'
        this.axiosOptions.method = 'GET'
        const data =  await gitServices.fetch(this.credentials,this.axiosOptions)
        return data
    }
    async getApp(id:string | number){
        this.axiosOptions.method = "GET"
        this.axiosOptions.url  = `/orgs/${id}`
        return await gitServices.fetch(this.credentials,this.axiosOptions)
    }
    async getMembersOfApp(id: String | number){
        this.axiosOptions.method = "GET"
        this.axiosOptions.url = `/orgs/${id}/members`
        return await gitServices.fetch(this.credentials,this.axiosOptions)
    }
    async getMemberDetail(id:String | number, memberIdorLogin:String | number){
        this.axiosOptions.method = "GET"
        this.axiosOptions.url= `/orgs/${id}/memberships/${memberIdorLogin}`
        return await gitServices.fetch(this.credentials,this.axiosOptions)
    }

    async addMember(groupId:String|number, memberDetail: {email:string, role:string}){
        //refactoring needed
        this.axiosOptions.body = memberDetail
        this.axiosOptions.method = "POST"
        this.axiosOptions.url = `/orgs/${groupId}/invitations`
        return await gitServices.fetch(this.credentials, this.axiosOptions)
    }

    async editMember(groupId:string | number, userIdorLogin:string | number, memberDetail:{} ){
        this.axiosOptions.url = `/orgs/${groupId}/memberships/${userIdorLogin}`
        this.axiosOptions.body = memberDetail
        this.axiosOptions.method = "PUT"
        return await gitServices.fetch( this.credentials,this.axiosOptions)
    }
    async removeMember(groupId:string | number, userIdorLogin:string|number){
        this.axiosOptions.url = `/orgs/${groupId}/memberships/${userIdorLogin}`
        this.axiosOptions.method = "DELETE"
        return await gitServices.fetch(this.credentials,this.axiosOptions)
    }
    
}

export default githubProcessor