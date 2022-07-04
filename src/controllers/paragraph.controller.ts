import {Request, Response} from 'express';
import { getParagraphById, getParagraphList, updateParagraphById, postParagraph } from '../services/paragraph.service';

const BUCKET_NAME = "guru-images-jnvsumit";

class ParagraphController {
    private static _instance: ParagraphController;

    public static getInstance(){
        if(ParagraphController._instance){
            return ParagraphController._instance;
        }

        ParagraphController._instance = new ParagraphController();
        return ParagraphController._instance;
    }

    public async getParagraphById(req: Request, res: Response){
        try{
            const id: string = (req.query.paraId || "") as string;
            const para = await getParagraphById(id);
            return res.status(200).json({
                success: false,
                message: "Successful",
                data: para
            });
        }catch(e: Error | any){
            return res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }

    public async getParagraphList(req: Request, res: Response){
        try{
            const skip: number = (req.query.skip || 0) as number;
            const limit: number = (req.query.limit || 30) as number;
            const paras = await getParagraphList(skip, limit);
            return res.status(200).json({
                success: false,
                message: "Successful",
                data: paras
            });
        }catch(e: Error | any){
            return res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }

    public async updateParagraphById(req: Request, res: Response){
        try{
            const id: string = (req.query.paraId || "") as string;
            const { paraTitle, seqNo, del, paraText } = req.body;
            const para = await updateParagraphById(id, paraTitle, seqNo, paraText, del === "true");
            return res.status(200).json({
                success: false,
                message: "Successful",
                data: para
            });
        }catch(e: Error | any){
            return res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }

    public async postParagraph(req: Request, res: Response){
        try{
            const {paraTitle, seqNo, paraText } = req.body;
            const bucketName: string = BUCKET_NAME;
            const para = await postParagraph(paraText, bucketName, seqNo, paraTitle);
            return res.status(200).json({
                success: false,
                message: "Successful",
                data: para
            });
        }catch(e: Error | any){
            return res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }
}

export default ParagraphController;