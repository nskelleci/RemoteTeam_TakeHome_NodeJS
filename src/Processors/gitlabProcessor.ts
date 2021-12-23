import gitServices from "../services/gitServices"
import AxiosOptions from "../vars/axiosOptions"
import credentials from "../vars/credentials"
import IPlatformProcessor from "./IPlatformProcessor"

class gitlabProcessor implements IPlatformProcessor {
    credentials: credentials
    axiosOptions: AxiosOptions
    
    constructor(credentials:credentials){
        this.credentials = credentials

        this.axiosOptions = {
            baseurl:'https://gitlab.com/api/v4/',
            url:'',
            method:'',
            body: {},
            params : {}
        }
    }
    async getApps() {
        this.axiosOptions.url = '/groups'
        this.axiosOptions.method = 'GET'
        return await gitServices.fetch(this.credentials,this.axiosOptions)
        
    }
    async getApp(id:string | number){
        this.axiosOptions.method = "GET"
        this.axiosOptions.url  = `/groups/${id}`
        return await gitServices.fetch(this.credentials,this.axiosOptions)
    }

    async getMembersOfApp(id: String | number){
        this.axiosOptions.method = "GET"
        this.axiosOptions.url = `/groups/${id}/members`
        return await gitServices.fetch(this.credentials,this.axiosOptions)
    }
    async getMemberDetail(id:String | number, memberId:String | number){
        this.axiosOptions.method = "GET"
        this.axiosOptions.url= `/groups/${id}/members/${memberId}`
        return await gitServices.fetch(this.credentials,this.axiosOptions)
    }

    async findMember(username: string){
        this.axiosOptions.method = "GET"
        this.axiosOptions.url = `/users?username=${username}`
        return await gitServices.fetch(this.credentials,this.axiosOptions)
    }

    async addMember(groupId:String|number, memberDetail: {username:string, access_level:number}){
           //refactoring needed
         
            const member = await this.findMember(memberDetail.username)
            if(!member.data.length){
                let result = {data:[], statusText:'user doesnt exist', status:400}
                return result
            } 
            this.axiosOptions.body = {id:groupId, user_id: member.data[0].id, access_level:memberDetail.access_level}
            this.axiosOptions.method = "POST"
            this.axiosOptions.url = `/groups/${groupId}/members`
            return await gitServices.fetch(this.credentials, this.axiosOptions)
        }
    async editMember(groupId:string | number, userid:string, memberDetail:{} ){
        this.axiosOptions.url = `/groups/${groupId}/members/${userid}`
        this.axiosOptions.body = memberDetail
        this.axiosOptions.method = "PUT"
        return await gitServices.fetch( this.credentials,this.axiosOptions)
    }
    async removeMember(groupId:string | number, userId:string){
        this.axiosOptions.url = `/groups/${groupId}/members/${userId}`
        this.axiosOptions.method = "DELETE"
        const result = await gitServices.fetch(this.credentials,this.axiosOptions)
        return result
    }
}

export default gitlabProcessor