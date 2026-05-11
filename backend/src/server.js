import express from 'express';
import router from './routes/taskRouters.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5000

const app = express();


//Middlewares
app.use(express.json());
app.use(cors({origin: "http://localhost:6969"}))

app.use("/api/tasks", router);

connectDB().then(() => {
    app.listen(PORT, () => { console.log(`Chào mừng đến với bình nguyên vô tận - port ${PORT}`) });
});
