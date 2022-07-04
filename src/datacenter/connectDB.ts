import mongoose from "mongoose";
import config from '../config';

export const connectDb = (dbName: string) =>{
    return new Promise((resolve, reject): void=>{
        mongoose.connect(config.MONGO_URI || "", {
            dbName
        }, function(err) {
            if (err){
                return reject(err);
            }
        });

        return resolve(null);
    });
}