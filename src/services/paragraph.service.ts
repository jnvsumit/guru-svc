import {v4 as uuidv4} from 'uuid';
import Paragraph from '../datacenter/models/paragraph';
import S3 from '../libs/s3';
import { s3UrlParser } from '../utils/parser';

export const getParagraphById = async (paragraphId: string) =>{
    return Paragraph.findOne({paragraphId});
}

export const getParagraphList = async (skip: number, limit: number) =>{
    return Paragraph.find().skip(skip).limit(limit);
}

export const updateParagraphById = async (paragraphId: string, paraTitle: string, seqNo: number, paraText: string, del: boolean) =>{
    const updateParams: {[key: string]: string | number} = {};

    if(paraTitle){
        updateParams["paragraphTitle"] = paraTitle.toString();
    }

    if(seqNo){
        updateParams["sequenceNo"] = seqNo;
    }

    if(del){
        updateParams["status"] = "inactive";
    }

    
    const response = await Paragraph.findOne({
        paragraphId
    });
    

    if(paraText){
        const s3Url: string = (response?.s3Url || "");
        const { bucketName, key } = s3UrlParser(s3Url);
        
        if(!bucketName || !key){
            throw new Error("Invalid s3 URL");
        }

        await S3.getInstance().uploadFile(key, paraText, bucketName);
    }

    return Paragraph.updateOne({
        paragraphId
    },{
        $set: {
            ...updateParams
        }
    },{
        returnOriginal: false
    });
}

export const postParagraph = async (paraText: string, bucketName: string, seqNo: number, paraTitle: string) =>{
    const key: string = uuidv4() + ".txt";

    await S3.getInstance().uploadFile(key, paraText, bucketName);

    const s3Url: string = `https://${bucketName}.s3.ap-south-1.amazonaws.com/${key}`;

    const paragraph = new Paragraph({
        paragraphId: uuidv4(),
        paragraphTitle: paraTitle,
        sequenceNo: seqNo,
        s3Url
    });

    return paragraph.save();
}