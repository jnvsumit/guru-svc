import {Request, Response} from 'express';

class LonginController {
    private static _instance: LonginController;

    public static getInstance(){
        if(LonginController._instance){
            return LonginController._instance;
        }

        LonginController._instance = new LonginController();
        return LonginController._instance;
    }

    public async login(req: Request, res: Response){
        const users = [{
            username: "admin",
            password: "fc8c0beb-ddbe"
        },
        {
            username: "sumit",
            password: "Sumit@123"
        }];
        try{
            const {username, password} = req.body;

            const user = users.find(u => u.username === username && u.password === password);

            if(!user){
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                });
            }

            return res.status(200).json({
                success: true,
                message: "Successful",
                data: {
                    action: "login",
                    token: "fc8c0beb-ddbe-474a-8638-096321be89cd"
                }
            });
        }catch(e: Error | any){
            return res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }

    public async logout(req: Request, res: Response){
        try{
            return res.status(200).json({
                success: true,
                message: "Successful",
                data: {
                    action: "logout"
                }
            });
        }catch(e: Error | any){
            return res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }
}

export default LonginController;