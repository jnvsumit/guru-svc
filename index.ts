import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './src/routes';
import { connectDb } from './src/datacenter/connectDB';

const app = express();
const port:number = (process.env.PORT || 3000) as number;

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());
app.use(express.json());
express.urlencoded({extended: false});
app.use("/", routes);

app.listen(port, async () => {
	await connectDb("gurudb");
	console.log(`The application is listening on port ${port}`);
});
