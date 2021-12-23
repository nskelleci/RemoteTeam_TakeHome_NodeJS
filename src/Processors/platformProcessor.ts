import IPlatformProcessor from "./IPlatformProcessor";

class platformProcessor{
   
    _processor: IPlatformProcessor
    constructor( processor: IPlatformProcessor){
        this._processor = processor
    }
}

export default platformProcessor