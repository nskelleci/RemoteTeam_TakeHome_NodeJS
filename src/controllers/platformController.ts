import customResponse from '../helpers/customResponse';
import IPlatformProcessor from '../Processors/IPlatformProcessor';
import processorFactory from '../Processors/processorFactory';
import credentials from '../vars/credentials';

export default class platformController {
    _credentials: credentials
    _processor : IPlatformProcessor
    _customResponse : customResponse
    constructor(credentials:credentials){
        this._credentials = credentials
        const _processorFactory = new processorFactory(this._credentials)
        this._processor = _processorFactory.createProcessor()
        this._customResponse = new customResponse()
    }

    async getApps() {
        const result = await this._processor.getApps()
        return this._customResponse.buildResponseStructure(result)
    }

    async getApp(appId:string|number) {
        const result = await this._processor.getApp(appId)
        return this._customResponse.buildResponseStructure(result)
    }

    async getAppUsers(appId:string|number){
        const result = await this._processor.getMembersOfApp(appId)
        return this._customResponse.buildResponseStructure(result)

    }

    async getAppUser(appId:string|number, userId: string|number){
        const result = await this._processor.getMemberDetail(appId,userId)
        return this._customResponse.buildResponseStructure(result)

    }

    async addMember(appId:string|number, memberDetail:{}){
        const result = await this._processor.addMember(appId,memberDetail)
        return this._customResponse.buildResponseStructure(result)

    }

    async editAppMember(appId:string|number, userId:string|number, memberDetail:{}){
        const result = await this._processor.editMember(appId,userId,memberDetail)
        return this._customResponse.buildResponseStructure(result)

    }

    async deleteMember(appId:string|number,userId:string|number){
        const result = await  this._processor.removeMember(appId,userId)
        return this._customResponse.buildResponseStructure(result)
    }

}


