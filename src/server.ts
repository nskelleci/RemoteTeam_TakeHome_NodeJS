import express, {Application, Request, Response} from 'express';
import data from './data/Data.json'
import credentials from './vars/credentials';
import platformController from './controllers/platformController';


const app: Application = express();

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port : ${PORT}`)
})

app.use(express.json())
const platformCredentials: credentials = data.platformCredentials[1]

//REFACTORING NEEDED
app.get('/',(req:Request, res:Response)=>{
    res.json({
        data: "GitOps v=0.1"
    })
})

app.get('/apps', async (req: Request,res: Response)=>{
    const pl = new platformController(platformCredentials)
    const result = await pl.getApps()
    res.send(result)
})

app.get('/:app/details', async (req: Request,res: Response)=>{
    const pl = new platformController(platformCredentials)
    const result = await pl.getApp(req.params.app)
    res.send(result)
})

app.get('/:app/users', async (req: Request,res: Response)=>{
    const pl = new platformController(platformCredentials)
    const result = await pl.getAppUsers(req.params.app)
    res.send(result)
})

app.get('/:app/users/:id', async (req: Request,res: Response)=>{
    const pl = new platformController(platformCredentials)
    const result = await pl.getAppUser(req.params.app, req.params.id)
    res.send(result)
})

app.post('/:app/users', async(req:Request, res:Response)=>{
    const pl = new platformController(platformCredentials)
    const result = await pl.addMember(req.params.app, req.body)
    res.send(result)
})

app.put('/:app/users/:id', async (req:Request, res:Response)=>{
    const pl = new platformController(platformCredentials)
    const result = await pl.editAppMember(req.params.app, req.params.id, req.body)
    res.send(result)
})

app.delete('/:app/users/:id', async (req:Request, res:Response)=>{
    const pl = new platformController(platformCredentials)
    const result = await pl.deleteMember(req.params.app, req.params.id)
    res.send(result)
})
