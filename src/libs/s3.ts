import AWS from 'aws-sdk';
import config from '../config';

const s3 = new AWS.S3({
    accessKeyId: config.s3AccessId,
    secretAccessKey: config.s3SecretAccessKey,
    region: 'ap-south-1'
});

class S3{
    private static _instance: S3;

    public static getInstance(){
        if(S3._instance){
            return S3._instance;
        }

        S3._instance = new S3();
        return S3._instance;
    }

    public async getFile(key: string, bucketName: string): Promise<any>{
        return new Promise((resolve, reject)=>{
            const params = {
                Bucket: bucketName,
                Key: key
            };
            
            s3.getObject(params, function(err: any, data: any) {
                if (err) {
                    reject(err);
                }
                
                return resolve(data.body.toString('utf-8'));
            });
        });
    }

    public async uploadFile(key: string, fileContent: string, bucketName: string): Promise<any>{
        return new Promise((resolve, reject)=>{
            const params = {
                Bucket: bucketName,
                Key: key,
                Body: fileContent
            };
            
            s3.upload(params, function(err: any, data: any) {
                if (err) {
                    return reject(err);
                }

                return resolve(data);
            });
        });
    };
}

export default S3;