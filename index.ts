import express from 'express';
import routes from './src/routes';
import { connectDb } from './src/datacenter/connectDB';

const app = express();
const port:number = (process.env.PORT || 3000) as number;

app.use(express.json());
express.urlencoded({extended: false});
app.use("/", routes);

app.listen(port, async () => {
	await connectDb("gurudb");
	console.log(`The application is listening on port ${port}`);
});
