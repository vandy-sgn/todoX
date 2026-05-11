import express from 'express';
import taskRoute from './routes/taskRouters.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 5000
const __dirname = path.resolve();

const app = express();

//========= Midlewares =========
app.use(express.json());
if (process.env.NODE_ENV === "development") {
    app.use(cors({ origin: "http://localhost:5173" }));
}

//========= API ============
app.use("/api/tasks", taskRoute);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => { res.sendFile(path.join(__dirname, "../frontend/dist/index.html")) });
}


//======== Connect Mongo Database
connectDB().then(() => {
    app.listen(PORT, () => { console.log(`Chào mừng đến với bình nguyên vô tận - port ${PORT}`) });
});
