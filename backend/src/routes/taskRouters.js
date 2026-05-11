import express from 'express'
import {createTask, deleteTask, getAlltasks, updateTask} from '../controllers/taskControllers.js'

const router = express.Router();

router.get("/", getAlltasks)

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id",deleteTask);

export default router;