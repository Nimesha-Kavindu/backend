import express from 'express';
import { addStudent, getStudents } from '../controllers/studentController.js';

const studentRouter = express.Router();

studentRouter.get('/', getStudents)

studentRouter.post('/', addStudent)

export default studentRouter;

