import {v4 as uuidv4} from 'uuid';
import Media from '../datacenter/models/media';
import S3 from '../libs/s3';
import { s3UrlParser } from '../utils/parser';

export const getMediaById = async (mediaId: string) =>{
    return Media.findOne({mediaId});
}

export const getMediaList = async (skip: number, limit: number, status: string) =>{
    return Media.find({ status }).skip(skip).limit(limit);
}

export const updateMediaById = async (mediaId: string, mediaTitle: string, seqNo: number, mediaContent: string, del: boolean) =>{
    const updateParams: {[key: string]: string | number} = {};

    if(mediaTitle){
        updateParams["mediaTitle"] = mediaTitle.toString();
    }

    if(seqNo){
        updateParams["sequenceNo"] = seqNo;
    }

    if(del){
        updateParams["status"] = "inactive";
    }

    
    const response = await Media.findOne({
        mediaId
    });
    

    if(mediaContent){
        const s3Url: string = (response?.s3Url || "");
        const { bucketName, key } = s3UrlParser(s3Url);
        
        if(!bucketName || !key){
            throw new Error("Invalid s3 URL");
        }

        await S3.getInstance().uploadFile(key, mediaContent, bucketName);
    }

    return Media.updateOne({
        mediaId
    },{
        $set: {
            ...updateParams
        }
    },{
        returnOriginal: false
    });
}

export const postMedia = async (mediaContent: string, bucketName: string, seqNo: number, mediaTitle: string, mimeType: string, mediaType: string, fileName?: string) =>{
    let key: string = uuidv4();

    if(!["image/jpg", "image/jpeg", "image/JPG", "image/JPEG", "text/plain"].includes(mimeType)){
        throw new Error("Invalid file type");
    }
    
    key += "." + (fileName && fileName.includes(".") ? fileName.split(".")[fileName.split(".").length - 1] : "jpg");

    const uploadContent = await S3.getInstance().uploadFile(key, mediaContent, bucketName);

    const s3Url: string = uploadContent.Location;

    const media = new Media({
        mediaId: uuidv4(),
        mediaType,
        mediaTitle: mediaTitle,
        sequenceNo: seqNo,
        mimeType,
        s3Url
    });

    return media.save();
}