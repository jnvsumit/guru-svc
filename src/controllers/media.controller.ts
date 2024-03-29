import {Request, Response} from 'express';
import { getMediaById, getMediaList, postMedia, updateMediaById } from '../services/media.service';

const BUCKET_NAME = "guru-images-jnvsumit";

class MediaController {
    private static _instance: MediaController;

    public static getInstance(){
        if(MediaController._instance){
            return MediaController._instance;
        }

        MediaController._instance = new MediaController();
        return MediaController._instance;
    }

    public async getMediaById(req: Request, res: Response){
        try{
            const id: string = (req.query.mediaId || "") as string;
            const media = await getMediaById(id);
            return res.status(200).json({
                success: true,
                message: "Successful",
                data: media
            });
        }catch(e: Error | any){
            return res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }

    public async getMediaList(req: Request, res: Response){
        try{
            const skip: number = (req.query.skip || 0) as number;
            const limit: number = (req.query.limit || 30) as number;
            const status: string = (req.query.status || "active") as string;
            const medias = await getMediaList(skip, limit, status);
            return res.status(200).json({
                success: true,
                message: "Successful",
                data: medias
            });
        }catch(e: Error | any){
            return res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }

    public async updateMediaById(req: Request, res: Response){
        try{
            const id: string = (req.query.mediaId || "") as string;
            const { mediaTitle, sequenceNo, del } = req.body;
            let mediaContent: any;
            let mimeType: string = "text/plain";

            if(req.body.mediaContent && typeof req.body.mediaContent === "string"){
                mediaContent = req.body.mediaContent;
            }else if(req.file){
                mediaContent = req.file.buffer;
                mimeType = req.file.mimetype;
            }
            
            const media = await updateMediaById(id, mediaTitle, sequenceNo, mediaContent, del, mimeType);
            return res.status(200).json({
                success: true,
                message: "Successful",
                data: media
            });
        }catch(e: Error | any){
            return res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }

    public async postMedia(req: Request, res: Response){
        try{
            const {mediaTitle, seqNo } = req.body;
            let mimeType: string = "text/plain";
            let mediaContent: any;
            let fileName: string = "text.txt";
            let mediaType: string = "text";

            if(req.body.mediaContent && typeof req.body.mediaContent === "string"){
                mediaContent = req.body.mediaContent;
            }else if(req.file){
                mediaType = "image";
                mediaContent = req.file.buffer;
                mimeType = req.file.mimetype;
                fileName = req.file.filename;
            }

            const bucketName: string = BUCKET_NAME;
            const media = await postMedia(mediaContent, bucketName, seqNo, mediaTitle, mimeType, mediaType, fileName);
            return res.status(200).json({
                success: true,
                message: "Successful",
                data: media
            });
        }catch(e: Error | any){
            console.log(e);
            
            return res.status(500).json({
                success: false,
                message: e.message
            });
        }
    }
}

export default MediaController;