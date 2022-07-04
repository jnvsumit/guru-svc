import dotenv from 'dotenv';
dotenv.config();

const config = {
    APP: "guru-svc",
    ENV: process.env.ENV,
    s3SecretAccessKey: process.env.S3_KEY,
    s3AccessId: process.env.S3_ID,
    MONGO_URI: process.env.MONGO_URI
}

export default config;